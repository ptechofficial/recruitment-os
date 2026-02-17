// Glassdoor → Unified Format
// Use this in n8n Code Node after Glassdoor scraper
// Set Code Node mode to: "Run Once for All Items"

// Get all input items
const inputItems = $input.all();

// Handle case where scraper returns array in a single item
let jobs = [];

if (inputItems.length === 1 && Array.isArray(inputItems[0].json)) {
  // Single item containing array of jobs
  jobs = inputItems[0].json;
} else if (inputItems.length === 1 && inputItems[0].json && !inputItems[0].json.job_id) {
  // Check if it's wrapped in another property (common with some scrapers)
  const firstItem = inputItems[0].json;
  const keys = Object.keys(firstItem);
  for (const key of keys) {
    if (Array.isArray(firstItem[key])) {
      jobs = firstItem[key];
      break;
    }
  }
  // If still no jobs found, treat as single job
  if (jobs.length === 0 && firstItem.job_title) {
    jobs = [firstItem];
  }
} else {
  // Multiple items, each is a job
  jobs = inputItems.map(item => item.json);
}

// Helper function to capitalize words
const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Helper to build location string from parts
const buildLocation = (parts) => parts.filter(p => p && p.trim()).join(', ');

// Transform each job to unified format
const results = [];

for (const job of jobs) {
  if (!job || typeof job !== 'object') continue;

  // Parse location
  const jobLocation = job.job_location || {};
  let city = '';
  let state = '';
  let country = jobLocation.country || '';

  // Parse "City, State" format from unknown field
  if (jobLocation.unknown && jobLocation.unknown.includes(',')) {
    const parts = jobLocation.unknown.split(',').map(p => p.trim());
    city = parts[0] || '';
    state = parts[1] || '';
  } else {
    city = jobLocation.city || jobLocation.unknown || '';
  }

  // Also try to get state from map data if available
  if (!state && job.all?.map?.stateName) {
    state = job.all.map.stateName;
  }

  // Build combined location string
  const location = buildLocation([
    capitalize(city),
    capitalize(state),
    capitalize(country)
  ]);

  // Determine work model
  let workModel = 'onsite';
  const desc = (job.job_description || '').toLowerCase();
  const title = (job.job_title || '').toLowerCase();
  const remoteTypes = job.all?.header?.remoteWorkTypes;

  if (job.job_remote === true || (remoteTypes && remoteTypes.length > 0)) {
    workModel = 'remote';
  } else if (desc.includes('hybrid') || title.includes('hybrid')) {
    workModel = 'hybrid';
  } else if (desc.includes('remote') || title.includes('remote')) {
    workModel = 'remote';
  }

  // Format salary - try multiple sources
  let salary = '';
  try {
    const pay = job.all?.header?.payPeriodAdjustedPay;
    const payPeriod = job.all?.header?.payPeriod || 'ANNUAL';
    const currency = job.job_salary?.currency || 'USD';

    if (pay && (pay.p10 || pay.p50 || pay.p90)) {
      const low = pay.p10 || pay.p50;
      const high = pay.p90 || pay.p50;
      const periodLabel = payPeriod === 'HOURLY' ? 'per hour' : 'annually';
      salary = `$${Number(low).toLocaleString()} - $${Number(high).toLocaleString()} ${currency} ${periodLabel}`;
    }
  } catch (e) {
    salary = '';
  }

  // Format job type
  let jobType = '';
  if (Array.isArray(job.job_job_types) && job.job_job_types.length > 0) {
    jobType = job.job_job_types[0].replace(/_/g, '-');
    jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1).toLowerCase();
  }

  // Get company short name if available
  const companyName = job.company_short_name || job.company_name || '';

  results.push({
    json: {
      id: String(job.job_id || ''),
      platform: 'glassdoor',
      company_name: companyName,
      title: job.job_title || '',
      job_type: jobType,
      location: location,
      work_model: workModel,
      jd: job.job_description || '',
      company_job_url: job.job_url || '',
      apply_url: '',
      salary: salary,
      company_description: job.company_description || '',
      website: job.company_website || '',
      decision_maker_email: '',
      match_score_analysis: '',
      outreach_email_text: ''
    }
  });
}

return results;

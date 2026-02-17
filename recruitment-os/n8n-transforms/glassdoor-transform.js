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

// Transform each job to unified format
const results = [];

for (const job of jobs) {
  if (!job || typeof job !== 'object') continue;

  // Parse location
  const location = job.job_location || {};
  let city = '';
  let state = '';
  let country = location.country || '';

  // Parse "City, State" format from unknown field
  if (location.unknown && location.unknown.includes(',')) {
    const parts = location.unknown.split(',').map(p => p.trim());
    city = parts[0] || '';
    state = parts[1] || '';
  } else {
    city = location.city || location.unknown || '';
  }

  // Capitalize city
  if (city) {
    city = city.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  // Capitalize country
  if (country) {
    country = country.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  // Determine work model
  let workModel = 'onsite';
  const desc = (job.job_description || '').toLowerCase();
  if (job.job_remote === true) {
    workModel = 'remote';
  } else if (desc.includes('remote')) {
    workModel = 'remote';
  } else if (desc.includes('hybrid')) {
    workModel = 'hybrid';
  }

  // Format salary
  let salary = '';
  try {
    const pay = job.all?.header?.payPeriodAdjustedPay;
    if (pay && pay.p10 && pay.p90) {
      const currency = job.job_salary?.currency || 'USD';
      salary = `$${Number(pay.p10).toLocaleString()} - $${Number(pay.p90).toLocaleString()} ${currency} annually`;
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

  results.push({
    json: {
      id: String(job.job_id || ''),
      platform: 'glassdoor',
      company_name: job.company_name || '',
      title: job.job_title || '',
      job_type: jobType,
      city: city,
      state: state,
      country: country,
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

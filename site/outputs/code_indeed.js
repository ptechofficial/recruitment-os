// Indeed → Unified Format
// Use this in n8n Code Node after Indeed scraper
// Set Code Node mode to: "Run Once for All Items"

const items = $input.all();

// Helper to build location string from parts
const buildLocation = (parts) => parts.filter(p => p && p.trim()).join(', ');

// Helper to capitalize words
const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

return items.map(item => {
  const job = item.json;

  // Parse location object
  const loc = job.location || {};
  let city = loc.city || '';
  let state = '';
  let country = loc.country || '';

  // Try to extract state from formattedAddressShort or fullAddress
  const addressStr = loc.formattedAddressShort || loc.fullAddress || '';
  if (addressStr && addressStr.includes(',')) {
    const parts = addressStr.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      if (!city) city = parts[0];
      state = parts[1] || '';
    }
  }

  // Handle "Remote" as special case
  if (city.toLowerCase() === 'remote') {
    city = 'Remote';
    state = '';
    country = '';
  }

  // Build combined location string
  const location = buildLocation([
    city !== 'Remote' ? capitalize(city) : city,
    state,
    capitalize(country)
  ]);

  // Determine work model
  let workModel = 'onsite';
  const descLower = (job.descriptionText || '').toLowerCase();
  const titleLower = (job.title || '').toLowerCase();

  if (job.isRemote === true || city === 'Remote') {
    workModel = 'remote';
  } else if (descLower.includes('hybrid') || titleLower.includes('hybrid')) {
    workModel = 'hybrid';
  } else if (descLower.includes('remote') || titleLower.includes('remote')) {
    workModel = 'remote';
  }

  // Format salary from salary object
  let salary = '';
  if (job.salary) {
    if (job.salary.salaryText) {
      salary = job.salary.salaryText;
    } else if (job.salary.salaryMin && job.salary.salaryMax) {
      const currency = job.salary.salaryCurrency || 'USD';
      salary = `$${job.salary.salaryMin.toLocaleString()} - $${job.salary.salaryMax.toLocaleString()} ${currency}`;
    }
  }

  // Get job type (array in Indeed) and normalize
  let jobType = Array.isArray(job.jobType) ? job.jobType[0] : (job.jobType || '');
  if (jobType) {
    jobType = jobType.replace(/_/g, '-');
    jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1).toLowerCase();
  }

  return {
    json: {
      id: String(job.jobKey || ''),
      platform: 'indeed',
      company_name: job.companyName || '',
      title: job.title || '',
      job_type: jobType,
      location: location,
      work_model: workModel,
      jd: job.descriptionText || '',
      company_job_url: job.jobUrl || '',
      apply_url: job.applyUrl || '',
      salary: salary,
      company_description: job.companyDescription || '',
      website: job.companyLinks?.corporateWebsite || '',
      decision_maker_email: '',
      match_score_analysis: '',
      outreach_email_text: ''
    }
  };
});

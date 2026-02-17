// LinkedIn Jobs → Unified Format
// Use this in n8n Code Node after LinkedIn Jobs scraper
// Set Code Node mode to: "Run Once for All Items"

const items = $input.all();

// Helper function to capitalize words
const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Helper to build location string from parts
const buildLocation = (parts) => parts.filter(p => p && p.trim()).join(', ');

return items.map(item => {
  const job = item.json;

  // Parse location (format: "City, State" or "City, Country")
  let city = '';
  let state = '';
  let country = '';

  if (job.location) {
    const locationParts = job.location.split(',').map(p => p.trim());
    city = locationParts[0] || '';
    state = locationParts[1] || '';
  }

  // Get country from companyAddress if available
  if (job.companyAddress?.addressCountry) {
    country = job.companyAddress.addressCountry;
  }

  // Build combined location string
  const location = buildLocation([
    capitalize(city),
    capitalize(state),
    country.length > 3 ? capitalize(country) : country
  ]);

  // Determine work model from description/title
  let workModel = 'onsite';
  const textToCheck = `${job.title || ''} ${job.descriptionText || ''}`.toLowerCase();
  if (textToCheck.includes('hybrid')) {
    workModel = 'hybrid';
  } else if (textToCheck.includes('remote')) {
    workModel = 'remote';
  }

  // Format salary
  let salary = job.salary || '';
  if (!salary && job.salaryInfo && job.salaryInfo[0]) {
    salary = job.salaryInfo[0];
  }

  // Format job type
  let jobType = job.employmentType || '';
  if (jobType) {
    jobType = jobType.replace(/_/g, '-');
    jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1).toLowerCase();
  }

  return {
    json: {
      id: String(job.id || ''),
      platform: 'linkedin_jobs',
      company_name: job.companyName || '',
      title: job.title || '',
      job_type: jobType,
      location: location,
      work_model: workModel,
      jd: job.descriptionText || '',
      company_job_url: job.link || '',
      apply_url: job.applyUrl || '',
      salary: salary,
      company_description: job.companyDescription || '',
      website: job.companyWebsite || '',
      decision_maker_email: '',
      match_score_analysis: '',
      outreach_email_text: ''
    }
  };
});

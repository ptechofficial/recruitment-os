// LinkedIn Jobs → Unified Format
// Use this in n8n Code Node after LinkedIn Jobs scraper

const items = $input.all();

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

  // Determine work model from description/title
  let workModel = 'onsite';
  const textToCheck = `${job.title || ''} ${job.descriptionText || ''}`.toLowerCase();
  if (textToCheck.includes('remote')) {
    workModel = 'remote';
  } else if (textToCheck.includes('hybrid')) {
    workModel = 'hybrid';
  }

  // Format salary
  let salary = job.salary || '';
  if (!salary && job.salaryInfo && job.salaryInfo[0]) {
    salary = job.salaryInfo[0];
  }

  return {
    json: {
      id: job.id || '',
      platform: 'linkedin_jobs',
      company_name: job.companyName || '',
      title: job.title || '',
      job_type: job.employmentType || '',
      city: city,
      state: state,
      country: country,
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

// Indeed → Unified Format
// Use this in n8n Code Node after Indeed scraper

const items = $input.all();

return items.map(item => {
  const job = item.json;

  // Parse location object
  const location = job.location || {};
  let city = location.city || '';
  let state = '';
  let country = location.country || '';

  // Handle "Remote" as special case
  if (city.toLowerCase() === 'remote') {
    city = 'Remote';
  }

  // Determine work model
  let workModel = 'onsite';
  const descLower = (job.descriptionText || '').toLowerCase();

  if (job.isRemote === true || city === 'Remote') {
    workModel = 'remote';
  } else if (descLower.includes('hybrid')) {
    workModel = 'hybrid';
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

  // Get job type (array in Indeed)
  const jobType = Array.isArray(job.jobType) ? job.jobType[0] : (job.jobType || '');

  return {
    json: {
      id: job.jobKey || '',
      platform: 'indeed',
      company_name: job.companyName || '',
      title: job.title || '',
      job_type: jobType,
      city: city,
      state: state,
      country: country,
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

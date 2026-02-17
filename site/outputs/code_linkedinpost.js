// LinkedIn Posts → Unified Format (for posts NOT needing AI enrichment)
// Use this in n8n Code Node after LinkedIn Posts scraper
// Set Code Node mode to: "Run Once for All Items"
// This handles posts that already have structured job data

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
  const data = {...item.json};

  // Remove internal processing fields
  delete data._needs_ai_enrichment;
  delete data._raw_content;
  delete data._author_info;

  // Build combined location string
  const location = buildLocation([
    capitalize(data.city || ''),
    capitalize(data.state || ''),
    capitalize(data.country || '')
  ]);

  // Normalize work model
  let workModel = (data.work_model || 'onsite').toLowerCase();
  if (!['remote', 'hybrid', 'onsite'].includes(workModel)) {
    workModel = 'onsite';
  }

  // Normalize job type
  let jobType = data.job_type || '';
  if (jobType) {
    jobType = jobType.replace(/_/g, '-');
    jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1).toLowerCase();
  }

  return {
    json: {
      id: String(data.id || ''),
      platform: 'linkedin_posts',
      company_name: data.company_name || '',
      title: data.title || '',
      job_type: jobType,
      location: location,
      work_model: workModel,
      jd: data.jd || '',
      company_job_url: data.company_job_url || '',
      apply_url: data.apply_url || '',
      salary: data.salary || '',
      company_description: data.company_description || '',
      website: data.website || '',
      decision_maker_email: data.decision_maker_email || '',
      match_score_analysis: data.match_score_analysis || '',
      outreach_email_text: data.outreach_email_text || ''
    }
  };
});

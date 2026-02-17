// Clean AI Agent output and merge with ORIGINAL data
// Use this in n8n Code Node after AI Agent for LinkedIn posts
// Set Code Node mode to: "Run Once for All Items"

const items = $input.all();

// Get original items from the first Code Node (before IF)
const originalItems = $('Needs AI Enrichment?').all();  // Change 'Code' to your actual node name

// Helper function to capitalize words
const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Helper to build location string from parts
const buildLocation = (parts) => parts.filter(p => p && p.trim()).join(', ');

return items.map((item, index) => {
  const aiData = item.json;
  const original = originalItems[index]?.json || {};

  // Parse AI response
  let aiExtracted = {};
  try {
    let response = aiData.output || '';
    response = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    aiExtracted = JSON.parse(response);

    // Convert null to empty strings
    for (const key in aiExtracted) {
      if (aiExtracted[key] === null) {
        aiExtracted[key] = '';
      }
    }
  } catch (e) {
    aiExtracted = {};
  }

  // Build combined location string
  const location = buildLocation([
    capitalize(aiExtracted.city || ''),
    capitalize(aiExtracted.state || ''),
    capitalize(aiExtracted.country || '')
  ]);

  // Normalize work model
  let workModel = (aiExtracted.work_model || 'onsite').toLowerCase();
  if (!['remote', 'hybrid', 'onsite'].includes(workModel)) {
    workModel = 'onsite';
  }

  // Normalize job type
  let jobType = aiExtracted.job_type || '';
  if (jobType) {
    jobType = jobType.replace(/_/g, '-');
    jobType = jobType.charAt(0).toUpperCase() + jobType.slice(1).toLowerCase();
  }

  return {
    json: {
      id: String(original.id || ''),
      platform: 'linkedin_posts',
      company_name: aiExtracted.company_name || original.company_name || '',
      title: aiExtracted.title || '',
      job_type: jobType,
      location: location,
      work_model: workModel,
      jd: aiExtracted.jd || original.jd || '',
      company_job_url: original.company_job_url || '',
      apply_url: aiExtracted.apply_url || '',
      salary: aiExtracted.salary || '',
      company_description: '',
      website: '',
      decision_maker_email: aiExtracted.decision_maker_email || original.decision_maker_email || '',
      match_score_analysis: '',
      outreach_email_text: ''
    }
  };
});

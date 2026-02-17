// LinkedIn Posts → Unified Format
// Use this in n8n Code Node after LinkedIn Posts scraper
//
// NOTE: LinkedIn Posts contain unstructured data. This script handles:
// 1. Posts WITH embedded job objects (repost.job) - extracts directly
// 2. Posts WITHOUT structured data - flags for AI enrichment
//
// For best results, follow this Code Node with an IF node to route
// items with _needs_ai_enrichment=true to an AI Node for extraction.

const items = $input.all();
const results = [];

for (const item of items) {
  const post = item.json;

  // Check if post has embedded job data (in repost.job)
  const jobData = post.repost?.job;

  if (jobData) {
    // Has structured job data - extract directly
    let city = '';
    let state = '';
    let country = '';
    let workModel = 'onsite';

    // Parse location (format: "City, State, Country (Work Model)")
    if (jobData.location) {
      const locMatch = jobData.location.match(/^([^,]+),?\s*([^,]+)?,?\s*([^(]+)?\s*\(?(Hybrid|Remote|On-site)?\)?/i);
      if (locMatch) {
        city = locMatch[1]?.trim() || '';
        state = locMatch[2]?.trim() || '';
        country = locMatch[3]?.trim() || '';
        if (locMatch[4]) {
          workModel = locMatch[4].toLowerCase().replace('-', '');
          if (workModel === 'onsite') workModel = 'onsite';
        }
      }
    }

    // Extract email from post content if mentioned
    let email = '';
    const content = post.repost?.content || post.content || '';
    const emailMatch = content.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      email = emailMatch[0];
    }

    // Extract apply URL from content attributes
    let applyUrl = jobData.linkedinUrl || '';
    const contentAttrs = post.repost?.contentAttributes || [];
    const textLinks = contentAttrs.filter(a => a.type === 'TEXT_LINK');
    if (textLinks.length > 0 && textLinks[0].textLink) {
      applyUrl = textLinks[0].textLink;
    }

    // Get company name from job subtitle or author
    let companyName = '';
    if (jobData.subtitle) {
      companyName = jobData.subtitle.replace(/^Job by\s*/i, '');
    } else if (post.repost?.author?.name) {
      companyName = post.repost.author.name;
    }

    results.push({
      json: {
        id: post.repostId || post.id || '',
        platform: 'linkedin_posts',
        company_name: companyName,
        title: jobData.title?.trim() || '',
        job_type: workModel === 'hybrid' ? 'Hybrid' : '',
        city: city,
        state: state,
        country: country,
        work_model: workModel,
        jd: content,
        company_job_url: jobData.linkedinUrl || '',
        apply_url: applyUrl,
        salary: '',
        company_description: '',
        website: '',
        decision_maker_email: email,
        match_score_analysis: '',
        outreach_email_text: '',
        _needs_ai_enrichment: false
      }
    });
  } else {
    // No structured job data - flag for AI processing
    // Extract what we can from the post content
    const content = post.content || '';

    // Try to extract email if present
    let email = '';
    const emailMatch = content.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      email = emailMatch[0];
    }

    results.push({
      json: {
        id: post.id || '',
        platform: 'linkedin_posts',
        company_name: post.author?.name || '',
        title: '',
        job_type: '',
        city: '',
        state: '',
        country: '',
        work_model: '',
        jd: content,
        company_job_url: post.linkedinUrl || '',
        apply_url: '',
        salary: '',
        company_description: '',
        website: '',
        decision_maker_email: email,
        match_score_analysis: '',
        outreach_email_text: '',
        _needs_ai_enrichment: true,
        _raw_content: content,
        _author_info: post.author?.info || ''
      }
    });
  }
}

return results;

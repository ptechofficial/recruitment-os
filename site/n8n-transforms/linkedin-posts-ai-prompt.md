# LinkedIn Posts AI Extraction Prompt

Use this prompt in an n8n AI Node (OpenAI, Claude, etc.) to extract job information from unstructured LinkedIn posts.

## Workflow Setup

```
LinkedIn Posts Scraper → Code Node (linkedin-posts-transform.js) → IF Node → AI Node → Code Node (post-process)
```

### IF Node Condition
Route to AI Node when: `{{ $json._needs_ai_enrichment }}` equals `true`

---

## AI Node Configuration

### System Prompt
```
You are a job posting data extractor. Extract structured job information from LinkedIn posts and return valid JSON only. If information is not found, use empty string "".
```

### User Prompt
```
Extract job posting information from this LinkedIn post content. Return JSON with these exact fields:

{
  "title": "Job title",
  "company_name": "Company name",
  "city": "City location",
  "state": "State or Region",
  "country": "Country",
  "work_model": "remote OR hybrid OR onsite",
  "job_type": "Full-time OR Part-time OR Contract",
  "salary": "Any salary/compensation mentioned",
  "jd": "Brief job description summary (max 500 chars)",
  "decision_maker_email": "Any email mentioned for applications"
}

Content to analyze:
{{ $json._raw_content }}

Author: {{ $json.company_name }}
Author Info: {{ $json._author_info }}

Return ONLY valid JSON, no explanation or markdown.
```

---

## Post-AI Code Node

Use this code node after the AI node to merge the extracted data:

```javascript
// Merge AI extraction with original LinkedIn Post data
const items = $input.all();

return items.map(item => {
  const data = item.json;

  // Parse AI response (handle both string and object)
  let aiExtracted = {};
  try {
    if (typeof data.ai_response === 'string') {
      // Clean up potential markdown code blocks
      let cleaned = data.ai_response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      aiExtracted = JSON.parse(cleaned);
    } else if (data.ai_response) {
      aiExtracted = data.ai_response;
    }
  } catch (e) {
    // If parsing fails, use empty object
    aiExtracted = {};
  }

  return {
    json: {
      id: data.id || '',
      platform: 'linkedin_posts',
      company_name: aiExtracted.company_name || data.company_name || '',
      title: aiExtracted.title || '',
      job_type: aiExtracted.job_type || '',
      city: aiExtracted.city || '',
      state: aiExtracted.state || '',
      country: aiExtracted.country || '',
      work_model: aiExtracted.work_model || 'onsite',
      jd: aiExtracted.jd || data.jd?.substring(0, 500) || '',
      company_job_url: data.company_job_url || '',
      apply_url: '',
      salary: aiExtracted.salary || '',
      company_description: '',
      website: '',
      decision_maker_email: aiExtracted.decision_maker_email || data.decision_maker_email || '',
      match_score_analysis: '',
      outreach_email_text: ''
    }
  };
});
```

---

## Alternative: Single AI Node for All Posts

If you want to process ALL LinkedIn posts through AI (simpler workflow), use this setup:

### Workflow
```
LinkedIn Posts Scraper → AI Node → Code Node (format output)
```

### AI Prompt for All Posts
```
Extract job posting information from this LinkedIn post. The post may contain:
1. A direct job posting with details
2. A repost of a job listing
3. Someone sharing/recommending a job opportunity

Return JSON with these fields (use empty string "" if not found):

{
  "title": "Job title",
  "company_name": "Hiring company name",
  "city": "City",
  "state": "State/Region",
  "country": "Country",
  "work_model": "remote/hybrid/onsite",
  "job_type": "Full-time/Part-time/Contract",
  "salary": "Salary if mentioned",
  "jd": "Job description summary",
  "decision_maker_email": "Contact email if provided"
}

Post content:
{{ $json.content }}

{{ $json.repost?.content }}

Job card (if present):
Title: {{ $json.repost?.job?.title }}
Location: {{ $json.repost?.job?.location }}
Company: {{ $json.repost?.job?.subtitle }}

Author: {{ $json.author?.name }} - {{ $json.author?.info }}

Return ONLY valid JSON.
```

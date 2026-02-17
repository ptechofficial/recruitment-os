# Unified Job Schema

All platform transformations output data in this consistent format.

## Schema (15 fields)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique job identifier | `"1010029105571"` |
| `platform` | string | Source platform | `"glassdoor"`, `"indeed"`, `"linkedin_jobs"`, `"linkedin_posts"` |
| `company_name` | string | Company name | `"Amazon Web Services"` |
| `title` | string | Job title | `"Senior Software Engineer"` |
| `job_type` | string | Employment type (capitalized) | `"Full-time"`, `"Part-time"`, `"Contract"` |
| `location` | string | Combined location | `"New York, NY, United States"` |
| `work_model` | string | Work arrangement (lowercase) | `"remote"`, `"hybrid"`, `"onsite"` |
| `jd` | string | Job description (plain text) | Full job description |
| `company_job_url` | string | Original job posting URL | `"https://..."` |
| `apply_url` | string | Direct application URL | `"https://..."` |
| `salary` | string | Salary information | `"$100,000 - $150,000 USD annually"` |
| `company_description` | string | About the company | Company description text |
| `website` | string | Company website | `"https://company.com"` |
| `decision_maker_email` | string | Contact email (if found) | `"hr@company.com"` |
| `match_score_analysis` | string | AI matching analysis | Populated later |
| `outreach_email_text` | string | Generated outreach email | Populated later |

## Normalization Rules

### Location
- Combined from city, state, country parts
- Empty parts are filtered out
- Format: `"City, State, Country"` or partial (e.g., `"Remote"`, `"New York, NY"`)

### Work Model
- Always **lowercase**: `"remote"`, `"hybrid"`, or `"onsite"`
- Default: `"onsite"` if not detected

### Job Type
- **Title case** with hyphens: `"Full-time"`, `"Part-time"`, `"Contract"`

### IDs
- Always converted to **string** type

## Platform-Specific Code Files

| Platform | Transformation File |
|----------|---------------------|
| Glassdoor | `code_glassdoor.js` |
| Indeed | `code_indeed.js` |
| LinkedIn Jobs | `code_linkedinjob.js` |
| LinkedIn Posts (no AI) | `code_linkedinpost.js` |
| LinkedIn Posts (with AI) | `code_postai_linkedinpost.js` |

## Example Unified Output

```json
{
  "id": "1010029105571",
  "platform": "glassdoor",
  "company_name": "Amazon Web Services",
  "title": "IT Application Development Engineer II",
  "job_type": "Full-time",
  "location": "New York, NY, United States",
  "work_model": "onsite",
  "jd": "We're on the lookout for the curious...",
  "company_job_url": "https://www.glassdoor.com/...",
  "apply_url": "",
  "salary": "$115,800 - $185,000 USD annually",
  "company_description": "",
  "website": "https://aws.amazon.com/careers/why-aws/",
  "decision_maker_email": "",
  "match_score_analysis": "",
  "outreach_email_text": ""
}
```

# Recruitment OS

AI-powered recruitment systems. Done for you.

Built by **Small Group** (Prakarsh Gupta & Tushar Mangla).

---

## What Is This

Recruitment OS is a done-for-you AI implementation service that helps recruitment agencies automate 60-80% of manual work. This repository contains:

1. **Landing Page** - Conversion-focused page driving discovery call bookings
2. **Dashboard Demo** - Interactive job scraping dashboard with analytics
3. **n8n Data Pipeline** - Job data transformations from 4 platforms into a unified schema
4. **GTM Strategy** - Complete go-to-market documentation

---

## The Product

9 AI-powered systems built for recruitment agencies:

| # | System | What It Does |
|---|--------|-------------|
| 1 | Demand Intelligence | Detect job openings weeks before they're posted |
| 2 | Job Board Scraper | Filter real opportunities, link to decision makers |
| 3 | AI Candidate Sourcing | Source, rank, and match candidates in real time |
| 4 | Candidate Reactivation | Turn dead databases into fresh placements |
| 5 | Resume Screening | Instant ranked shortlists |
| 6 | Client Communication | Automatic stage-based updates |
| 7 | Interview Scheduling | Zero-coordination booking |
| 8 | Reference Checking | Automated forms and follow-ups |
| 9 | Placement Dashboard | Full pipeline visibility + revenue forecasting |

**Proof:** Helped a German agency go from 200 manual searches/day to 40,000+ automated. Revenue doubled in 90 days.

---

## Project Structure

```
Recruitment OS/
├── CLAUDE.md                    # Claude Code instructions
├── README.md                    # This file
├── .gitignore
│
├── docs/                        # Strategy & planning documents
│   ├── gtm-strategy.md          # GTM strategy, ICP, personas, sales process
│   ├── landing-page-spec.md     # Landing page design specification
│   ├── proposal-deliberate-achievement.md
│   └── reference/
│       └── landing-page-best-practices.md
│
└── site/                        # Web application
    ├── index.html               # Landing page
    ├── landing.css              # Landing page styles
    ├── landing.js               # Landing page interactions
    ├── dashboard.html           # Dashboard demo
    ├── app.js                   # Dashboard logic
    ├── styles.css               # Dashboard styles
    ├── assets/screenshots/      # Product screenshots
    ├── n8n-transforms/          # Data pipeline transformations
    └── outputs/                 # Sample data & schema docs
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (custom properties), Vanilla JS (ES6+) |
| Charts | Chart.js |
| Data Pipeline | n8n workflows |
| Data Source | Google Sheets (CSV API) |
| Booking | Cal.com embed |
| Fonts | Inter, Sora (Google Fonts) |

No build tools. No frameworks. No dependencies to install.

---

## Quick Start

```bash
cd site/
python3 -m http.server 8080
```

Open `http://localhost:8080` for the landing page.
Open `http://localhost:8080/dashboard.html` for the dashboard.

---

## Landing Page

Single-purpose conversion page. Every section drives toward one action: **Book a Discovery Call**.

**Sections (top to bottom):**

1. Sticky header (logo + CTA)
2. Hero (headline + dashboard visual)
3. Social proof bar
4. Problem agitation (3 pain cards)
5. Solution overview
6. 9 systems grid
7. Case study (before/after metrics)
8. How it works (3 steps)
9. Why us (trust cards)
10. FAQ (accordion)
11. Apply / Cal.com embed
12. Footer

**Cal.com:** `cal.com/prakarshgupta/ai-dev`

**Design:** Terracotta accent (`#da7756`), Inter/Sora typography, 3 responsive breakpoints.

---

## Dashboard

Interactive demo showing the Job Board Scraper system in action:

- **Scraping Form** - Submit requests to n8n backend (job title, platforms, location, salary)
- **Analytics** - Chart.js visualizations (jobs by company, city, match scores, role categories)
- **Data Table** - Real-time sync from Google Sheets with expandable cells
- **Outreach** - Send emails directly via n8n webhooks from the table

Configure in `site/app.js`:

```javascript
const CONFIG = {
    webhookUrl: 'YOUR_N8N_WEBHOOK_URL',
    googleSheetUrl: 'YOUR_GOOGLE_SHEET_CSV_URL',
    emailWebhookUrl: 'YOUR_OUTREACH_WEBHOOK_URL',
    refreshInterval: 30000
};
```

---

## Data Pipeline

Scrapes jobs from 4 platforms and normalizes to a unified 15-field schema:

```
Glassdoor       -> glassdoor-transform.js       -> Unified Schema
Indeed          -> indeed-transform.js           -> Unified Schema
LinkedIn Jobs   -> linkedin-jobs-transform.js    -> Unified Schema
LinkedIn Posts  -> linkedin-posts-transform.js   -> Unified Schema (+ AI enrichment)
```

Schema: `site/outputs/UNIFIED_SCHEMA.md`

Key fields: `id`, `platform`, `company_name`, `title`, `job_type`, `location`, `work_model`, `jd`, `company_job_url`, `apply_url`, `salary`, `company_description`, `website`, `decision_maker_email`, `match_score_analysis`, `outreach_email_text`

---

## GTM Strategy

Full strategy documented in `docs/gtm-strategy.md`:

- **Target:** Mid-size agencies (10-100 recruiters, $1M-$20M revenue)
- **Geography:** UK (Phase 1), US East Coast (Phase 2), US West + Europe (Phase 3)
- **Channels:** LinkedIn outreach (primary), LinkedIn content, referrals, YouTube, cold email
- **Pricing:** $2,000+ per system / $7,000/month full suite
- **Goal:** 1-2 customers in first 30 days

**Buyer Personas:**
- "Scaling Sarah" - Agency Founder/CEO
- "Operations Owen" - Ops/Revenue Lead
- "Tech-Curious Tom" - Senior Recruiter

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Daily opportunities scanned | 40,000+ (vs 200 manual) |
| Revenue growth | 2x in 90 days |
| Manual work reduction | 80% |
| AI systems | 9 integrated |
| Implementation team | 25 people |
| Time to results | 60-90 days |

---

## Links

- **LinkedIn:** [Prakarsh Gupta](https://www.linkedin.com/in/prakarshgupta/)
- **Booking:** [cal.com/prakarshgupta/ai-dev](https://cal.com/prakarshgupta/ai-dev)

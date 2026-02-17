# Recruitment OS - Claude Code Instructions

## Project Overview

**Product:** Recruitment OS
**Company:** Small Group (Prakarsh Gupta & Tushar Mangla)
**What:** Done-for-you AI implementation service for recruitment agencies
**Website:** Landing page + interactive dashboard demo
**Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+), Chart.js, n8n, Google Sheets, Cal.com

---

## Project Structure

```
Recruitment OS/
├── CLAUDE.md                    # This file - Claude Code instructions
├── README.md                    # Project overview and documentation
├── .gitignore
│
├── docs/                        # Strategy & planning documents
│   ├── gtm-strategy.md          # GTM strategy, ICP, personas, sales process
│   ├── landing-page-spec.md     # Landing page design spec and structure
│   ├── proposal-deliberate-achievement.md  # Client proposal template
│   └── reference/
│       └── landing-page-best-practices.md  # Landing page conversion notes
│
└── site/                        # The actual web application
    ├── index.html               # Landing page (conversion-focused, single CTA)
    ├── landing.css              # Landing page styles (design system + responsive)
    ├── landing.js               # Landing page JS (scroll animations, FAQ, count-up)
    ├── dashboard.html           # Interactive dashboard demo
    ├── app.js                   # Dashboard logic (Chart.js, Google Sheets, n8n)
    ├── styles.css               # Dashboard styles
    ├── assets/
    │   └── screenshots/         # Product screenshots for landing page
    │       ├── analytics-charts.jpeg
    │       ├── dashboard-form.jpeg
    │       └── job-listings.jpeg
    ├── n8n-transforms/          # n8n workflow data transformations
    │   ├── glassdoor-transform.js
    │   ├── indeed-transform.js
    │   ├── linkedin-jobs-transform.js
    │   ├── linkedin-posts-transform.js
    │   ├── linkedin-posts-ai-prompt.md
    │   └── *.json               # Sample scraper input data
    └── outputs/                 # Sample output data & transform code
        ├── UNIFIED_SCHEMA.md    # Unified 15-field job schema spec
        ├── code_*.js            # Platform-specific transform code
        └── output_*.json        # Sample outputs per platform
```

---

## Key Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `site/index.html` | Landing page | Updating copy, sections, CTA |
| `site/landing.css` | Landing page styles | Design changes, responsive fixes |
| `site/landing.js` | Landing page interactions | Animations, FAQ behavior |
| `site/dashboard.html` | Dashboard demo | Adding/changing dashboard features |
| `site/app.js` | Dashboard logic | Data fetching, charts, webhooks |
| `site/styles.css` | Dashboard styles | Dashboard visual changes |
| `docs/gtm-strategy.md` | GTM strategy | Sales process, pricing, messaging updates |

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#da7756` (terracotta) | CTAs, accents, highlights |
| `--primary-dark` | `#c4654a` | Hover states |
| `--bg-primary` | `#ffffff` | Main background |
| `--bg-secondary` | `#faf9f7` | Alternating sections |
| `--bg-dark` | `#0a0a0a` | Dark sections (problem, CTA) |
| `--text-primary` | `#0d0d0d` | Headlines, body |
| `--text-secondary` | `#555555` | Descriptions |
| `--text-muted` | `#888888` | Labels, eyebrows |

### Typography
- **Headlines:** Sora (font-family fallback to Inter)
- **Body:** Inter
- **H1:** 50px / 800 weight
- **H2:** 44px / 800 weight
- **Body:** 16px / 400 weight

### Breakpoints
| Width | Target |
|-------|--------|
| > 1024px | Desktop (full layout) |
| 768-1024px | Tablet (2-col grids, stacked hero) |
| < 768px | Mobile (single column) |
| < 480px | Small mobile (compact spacing) |

---

## Landing Page Architecture

The landing page (`site/index.html`) follows a single-CTA conversion funnel:

```
Hero (hook + dashboard visual)
  -> Social Proof Bar
  -> Problem Agitation (3 pain cards, dark section)
  -> Solution Overview (differentiator bar)
  -> 9 Systems Grid (benefit-focused cards)
  -> Case Study (before/after + metrics)
  -> How It Works (3 steps)
  -> Why Us (trust cards)
  -> FAQ (accordion)
  -> Apply / Book Call (Cal.com embed)
  -> Footer
```

**Single Goal:** Every section drives toward "See If Your Agency Qualifies" -> Cal.com booking.

**Cal.com URL:** `cal.com/prakarshgupta/ai-dev`

---

## Dashboard Configuration

The dashboard (`site/app.js`) connects to external services via a CONFIG object:

```javascript
const CONFIG = {
    webhookUrl: 'N8N_WEBHOOK_URL',        // Scraping trigger
    googleSheetUrl: 'GOOGLE_SHEET_CSV_URL', // Data source
    emailWebhookUrl: 'OUTREACH_WEBHOOK_URL', // Email sending
    refreshInterval: 30000                  // Auto-refresh (30s)
};
```

---

## n8n Data Pipeline

The project scrapes job data from 4 platforms and normalizes to a unified 15-field schema:

```
Glassdoor  -> glassdoor-transform.js  -> Unified Schema
Indeed     -> indeed-transform.js     -> Unified Schema
LinkedIn Jobs -> linkedin-jobs-transform.js -> Unified Schema
LinkedIn Posts -> linkedin-posts-transform.js + AI prompt -> Unified Schema
```

Schema defined in `site/outputs/UNIFIED_SCHEMA.md`.

---

## Development

### Running Locally

```bash
cd site/
python3 -m http.server 8080
# Open http://localhost:8080
```

No build process. No dependencies to install. Pure HTML/CSS/JS.

### Making Changes

1. **Landing page copy changes:** Edit `site/index.html` directly
2. **Style changes:** Edit `site/landing.css` (check responsive breakpoints)
3. **Animation changes:** Edit `site/landing.js`
4. **Dashboard changes:** Edit `site/dashboard.html`, `site/app.js`, `site/styles.css`
5. **GTM/strategy updates:** Edit `docs/gtm-strategy.md`

### Content Guidelines

- Use specific numbers (40,000, 90 days, 80%, 2x)
- Frame everything as outcomes, not features
- No hype words (revolutionary, game-changing, disruptive)
- No guaranteed results promises
- Single CTA type: everything points to "Book a Call" / "See If You Qualify"
- No emojis in the landing page

---

## Business Context

### The 9 Core Systems (Product Offering)

1. **Demand Intelligence** - Detect job openings before they're posted
2. **Job Board Scraper** - Filter real opportunities + link to decision makers
3. **AI Candidate Sourcing** - Real-time sourcing, ranking, matching
4. **Candidate Reactivation** - Turn dead database into placements
5. **Resume Screening** - Instant ranked shortlists
6. **Client Communication** - Automatic stage-based updates
7. **Interview Scheduling** - Zero-coordination booking
8. **Reference Checking** - Automated forms and follow-ups
9. **Placement Dashboard** - Full pipeline visibility + revenue forecasting

### Key Proof Points

- German agency case study: 200 -> 40,000+ daily opportunities scanned
- 2x revenue in 90 days
- 80% reduction in manual work
- 25-person implementation team

### Target Customer

- Mid-size recruitment agencies (10-100 recruiters)
- $1M-$20M annual revenue
- US, UK, Western Europe
- Using modern ATS/CRM (Bullhorn, Vincere, JobAdder)

### Pricing

- Single System: $2,000+ one-time
- Full Suite: $7,000/month retainer
- 30-day pilot: $2,500

---

## Rules

1. **No build tools required** - This is vanilla HTML/CSS/JS. Do not add webpack, vite, or any bundler.
2. **No frameworks** - Do not introduce React, Vue, or any JS framework.
3. **Conversion-first** - Every landing page change must serve the single CTA goal.
4. **Mobile-responsive** - Test all changes across breakpoints (1024, 768, 480).
5. **Performance** - Keep total page weight under 500KB (excluding Cal.com iframe).
6. **No stock photos** - Only product screenshots.
7. **Accessibility** - Maintain ARIA labels, semantic HTML, keyboard navigation.

# Recruitment OS - Landing Page & Sales Funnel Structure

> **Company:** Small Group
> **Product:** Recruitment OS
> **Goal:** Book discovery calls via Cal.com embed
> **Tone:** Professional & trustworthy
> **Cal.com:** cal.com/prakarshgupta/ai-dev
> **Tech:** Vanilla HTML/CSS/JS (replaces current index.html)

---

## Funnel Strategy

```
LinkedIn/YouTube Content
        |
        v
   Landing Page (this)
        |
        v
  Scroll through value + proof
        |
        v
  Book Discovery Call (Cal.com)
        |
        v
  Discovery Call → Proposal → Close
```

**Single Goal:** Every section drives toward one action — **Book a Discovery Call**.
No navigation links to other pages. No distractions. One path forward.

---

## Page Structure (Top to Bottom)

---

### Section 1: STICKY HEADER

**Purpose:** Brand presence + persistent CTA

| Element | Content |
|---------|---------|
| Left | Small Group logo (minimal wordmark) |
| Right | Single CTA button: **"Book a Call"** (scrolls to cal.com section) |

**Design notes:**
- Transparent on load, becomes solid white with subtle shadow on scroll
- No navigation links — just logo + CTA
- Mobile: Logo left, CTA right (compact)

---

### Section 2: HERO

**Purpose:** Hook — communicate what we do and for whom in under 3 seconds.

**Layout:** Split — Text left, product screenshot right

| Element | Content |
|---------|---------|
| Eyebrow tag | `AI-Powered Recruitment Systems` |
| Headline | **"Your recruiters are spending 4 hours a day on work AI can do in seconds."** |
| Subheadline | We build and implement AI systems that automate 60–80% of manual recruitment work — so your team can focus on relationships and closing deals. |
| Primary CTA | **"Book a Discovery Call"** → scrolls to cal.com section |
| Secondary CTA | "See How It Works" → scrolls to case study section |
| Trust strip | `Trusted by recruitment agencies across the US, UK & Europe` + small stat badges: `40,000+ opportunities scanned daily` · `2x revenue in 90 days` · `9 AI systems` |
| Visual | Dashboard screenshot (angled, with subtle shadow, floating above a light gradient background) |

**Design notes:**
- Full viewport height (100vh)
- Clean white background with subtle warm gradient at edges
- Headline is large, bold, black — unmissable
- Screenshot should show the analytics dashboard (most visually impressive part)

---

### Section 3: PROBLEM AGITATION

**Purpose:** Make them feel the pain they already know. Build urgency.

**Layout:** Centered text + 3 pain-point cards

| Element | Content |
|---------|---------|
| Section label | `The Problem` |
| Headline | **"The recruitment playbook from 2015 isn't working anymore."** |
| Body | Most agencies are stuck in a cycle: more recruiters, same margins, longer hours. Meanwhile, the agencies winning right now aren't working harder — they're working with better systems. |

**3 Pain Point Cards (icon + stat + description):**

| Card | Stat | Description |
|------|------|-------------|
| Late to every opportunity | 50+ agencies | By the time you find a job post, you're already competing with 50+ other agencies on the same role. |
| Drowning in manual work | 3–4 hours/day | Your recruiters spend more time searching and data-entry than actually recruiting. |
| Scaling means more headcount | Linear cost growth | Want 2x revenue? The old playbook says hire 2x recruiters. That kills your margins. |

**Design notes:**
- Light warm background (`--bg-secondary`)
- Cards have subtle borders, not heavy shadows
- Each card has a simple icon (clock, search, chart-trending-down)
- This section should create a "yes, that's exactly my problem" moment

---

### Section 4: SOLUTION OVERVIEW

**Purpose:** Introduce Recruitment OS as the answer.

**Layout:** Centered intro + visual system diagram

| Element | Content |
|---------|---------|
| Section label | `The Solution` |
| Headline | **"Meet Recruitment OS"** |
| Subheadline | A complete suite of 9 AI-powered systems — built, integrated, and optimized for your agency. Not another tool you have to figure out yourself. |
| Key differentiator | **Done-for-you implementation** — We build it. We integrate it. We train your team. We optimize until you see results. |
| Visual | Grid/diagram showing the 9 systems as connected nodes or a clean icon grid |

**Design notes:**
- White background
- The 9 systems should be shown as a clean visual — not a wall of text
- Each system is an icon + name + one-line benefit (hover or click for detail on desktop)
- This section transitions from "here's your problem" to "here's our answer"

---

### Section 5: THE 9 SYSTEMS (Benefits-Focused)

**Purpose:** Show what they get — framed as outcomes, not features.

**Layout:** 3×3 grid of system cards

| # | System | Benefit-Focused Description |
|---|--------|-----------------------------|
| 1 | Demand Intelligence | Detect job openings weeks before they're posted — reach clients when they need you most |
| 2 | Job Board Scraper | Stop wasting time on garbage listings — get only real opportunities, linked to decision makers |
| 3 | AI Candidate Sourcing | Source, rank, and match candidates in real time — not after hours of manual searching |
| 4 | Candidate Reactivation | Turn your dead database into fresh placements — revenue hiding in plain sight |
| 5 | Resume Screening | Get ranked shortlists instantly — no more spending hours reviewing resumes |
| 6 | Client Communication | Keep clients informed automatically — no more "just checking in" emails |
| 7 | Interview Scheduling | Zero-coordination booking — eliminate calendar chaos for good |
| 8 | Reference Checking | Automated forms and follow-ups — weeks of phone tag become hours |
| 9 | Placement Dashboard | Full pipeline visibility + revenue forecasting — know exactly where every deal stands |

**Design notes:**
- Each card: Icon + System name + One-line benefit
- Subtle hover effect revealing slightly more detail
- Terracotta accent on icons or card top-border
- Numbered subtly (1–9) to convey completeness/comprehensiveness
- Mobile: Single column stack

---

### Section 6: CASE STUDY / PROOF

**Purpose:** This is the money section. Prove it works with real numbers.

**Layout:** Full-width section with before/after comparison + narrative

| Element | Content |
|---------|---------|
| Section label | `Case Study` |
| Headline | **"How a German recruitment agency doubled their revenue in 90 days"** |
| Before state | 200–300 manual job searches per day. Recruiters working late. Always late to opportunities. Competing on price. |
| After state | 40,000+ opportunities scanned daily. Reached companies weeks before competitors. Revenue doubled. Recruiters got their evenings back. |
| Key metrics (large display) | **200 → 40,000** daily opportunities scanned · **2x** revenue in 90 days · **80%** reduction in manual work |
| Quote/Testimonial | (If available from German client — even a paraphrased result statement works) |

**Visual approach:**
- Before/After side-by-side comparison
- Big bold numbers for the metrics (animated count-up on scroll into view)
- Warm background section to make it visually distinct
- Product screenshot showing the dashboard with real-looking data

**Design notes:**
- This section should be impossible to scroll past without noticing the numbers
- The contrast between "200 manual searches" and "40,000 automated" is the hero stat
- Consider a subtle timeline graphic: Day 1 → Day 30 → Day 60 → Day 90

---

### Section 7: HOW IT WORKS

**Purpose:** Remove complexity. Show it's easy to get started.

**Layout:** 3-step horizontal process

| Step | Title | Description |
|------|-------|-------------|
| 1 | Discovery Call | We learn about your agency, your workflow, and your biggest bottlenecks. 30 minutes, no commitment. |
| 2 | Custom Implementation | Our 25-person team builds and integrates your systems. Your team's involvement: 2–3 hours per week. |
| 3 | Results & Optimization | Systems go live. We monitor, optimize, and support. You focus on closing deals. |

**Design notes:**
- Clean horizontal layout with numbered circles and connecting lines
- Each step has a subtle icon
- Mobile: Vertical stack with connecting line down the left
- Below the steps: **"Most agencies are fully operational within 60 days."**

---

### Section 8: WHY US (TRUST & DIFFERENTIATION)

**Purpose:** Handle the "why should I trust you" objection.

**Layout:** 2–3 trust blocks

| Block | Content |
|-------|---------|
| Done-For-You | "We don't sell software and leave you to figure it out. Our 25-person team implements everything — from system build to team training." |
| Results-Focused | "We measure success by your revenue growth, not feature adoption. If your placements don't increase, we haven't done our job." |
| No Disruption | "Everything integrates with your existing tools — Bullhorn, Vincere, JobAdder, or whatever you use. No rip-and-replace." |

**Optional additions:**
- Team size badge: "25-person implementation team"
- Integration logos: Bullhorn, Vincere, JobAdder, etc. (if we have permission to use)
- "We work with agencies across the US, UK, and Europe"

**Design notes:**
- Three columns on desktop, single column on mobile
- Subtle icons for each block
- Light background to differentiate from surrounding sections

---

### Section 9: FAQ (OBJECTION HANDLING)

**Purpose:** Kill remaining doubts before the CTA.

**Layout:** Accordion-style FAQ

| Question | Answer |
|----------|--------|
| **How much does it cost?** | Every agency is different, so we tailor our solutions to your needs. Book a discovery call and we'll put together a custom recommendation. |
| **How long until we see results?** | Most agencies are fully operational within 60 days. Our German client saw measurable results within 90 days, including doubled revenue. |
| **Will this integrate with our existing ATS/CRM?** | Yes. We integrate with Bullhorn, Vincere, JobAdder, and most modern ATS/CRM platforms. Integration is part of our implementation — you don't need internal technical resources. |
| **What if we've tried automation tools before and they didn't work?** | That's common with self-serve tools. The difference is we implement and optimize everything for you. You don't need to become AI experts — you just use the systems we build. |
| **How much of my team's time does this require?** | About 2–3 hours per week during setup, mostly for training. After implementation, the systems save your team 3–4 hours per day. |
| **What if it doesn't work for our niche?** | Our systems are customized for your specific market and workflows. We can start with a smaller pilot to prove results before full commitment. |

**Design notes:**
- Clean accordion with smooth expand/collapse animation
- Question text bold, answer text regular weight
- Subtle left border accent (terracotta) on expanded items
- This section should feel calm and reassuring — not salesy

---

### Section 10: FINAL CTA + CAL.COM EMBED

**Purpose:** Convert. This is the bottom of the funnel.

**Layout:** Two-column — Value recap left, Cal.com iframe right

| Element | Content |
|---------|---------|
| Section label | `Ready to Get Started?` |
| Headline | **"Book a free discovery call"** |
| Body | In 30 minutes, we'll learn about your agency, identify your biggest bottlenecks, and show you exactly which systems can help. No commitment, no hard sell. |
| What to expect list | ✓ Understand your current workflow · ✓ Identify automation opportunities · ✓ See how Recruitment OS fits your agency · ✓ Get a custom recommendation |
| Cal.com embed | `<iframe>` of `cal.com/prakarshgupta/ai-dev` |

**Design notes:**
- Warm background (subtle terracotta tint or `--bg-secondary`)
- Cal.com iframe should be prominently displayed and fully functional
- On mobile: Stack — text on top, cal embed below (full width)
- This section should feel inviting and low-pressure
- No other links or CTAs competing for attention

---

### Section 11: FOOTER

**Purpose:** Legal + brand presence (minimal)

| Element | Content |
|---------|---------|
| Left | Small Group logo + "AI-Powered Recruitment Systems" |
| Center | © 2026 Small Group. All rights reserved. |
| Right | LinkedIn icon (link to company profile) |

**Design notes:**
- Minimal, dark background (#0d0d0d or similar)
- White/muted text
- No navigation links — the page has one purpose

---

## Additional Design Specifications

### Color Palette (Extending existing system)

| Use | Color | Notes |
|-----|-------|-------|
| Primary CTA | `#da7756` (terracotta) | All buttons, accents |
| Primary Hover | `#c4654a` | Darker terracotta |
| Background | `#ffffff` | Main sections |
| Alt Background | `#faf9f7` | Alternating sections |
| Warm Background | `rgba(218, 119, 86, 0.04)` | CTA section, case study |
| Text Primary | `#0d0d0d` | Headlines, body |
| Text Secondary | `#666666` | Descriptions, labels |
| Text Muted | `#999999` | Section labels, eyebrows |

### Typography

| Element | Size (Desktop) | Weight | Font |
|---------|----------------|--------|------|
| H1 (Hero headline) | 56px | 700 | Inter |
| H2 (Section headlines) | 40px | 700 | Inter |
| H3 (Card titles) | 20px | 600 | Inter |
| Body large | 18px | 400 | Inter |
| Body | 16px | 400 | Inter |
| Eyebrow/label | 14px | 500 (uppercase, letter-spaced) | Inter |
| Stat numbers | 64px | 700 | Inter |

### Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Sections | Fade-in + slight upward slide | Scroll into viewport (IntersectionObserver) |
| Stat numbers | Count-up from 0 | Scroll into viewport |
| CTA buttons | Subtle scale on hover (1.02) | Hover |
| FAQ items | Smooth height expand/collapse | Click |
| Header | Background opacity transition | Scroll past hero |
| System cards | Subtle lift + shadow on hover | Hover |

### Responsiveness

| Breakpoint | Changes |
|------------|---------|
| > 1200px | Full desktop layout |
| 768–1200px | 2-column grids become 2-col, hero image below text |
| < 768px | Single column everything, larger touch targets, cal.com full width |
| < 480px | Compact spacing, smaller headlines (H1: 36px, H2: 28px) |

---

## Content Tone Guidelines

- **Do:** Use specific numbers (40,000, 90 days, 80%, 2x)
- **Do:** Frame everything as outcomes for the agency
- **Do:** Acknowledge their sophistication ("You've tried tools before")
- **Don't:** Use hype words (revolutionary, game-changing, disruptive)
- **Don't:** Promise guaranteed results
- **Don't:** Use generic stock photos — product screenshots only
- **Don't:** Include more than one CTA type (everything points to "Book a Call")

---

## Technical Notes

### Cal.com Embed Code
```html
<iframe
  src="https://cal.com/prakarshgupta/ai-dev?embed=true&theme=light"
  width="100%"
  height="700"
  frameborder="0"
  style="border-radius: 12px; min-height: 600px;"
  loading="lazy"
></iframe>
```

### SEO Basics
```html
<title>Recruitment OS by Small Group — AI Systems for Recruitment Agencies</title>
<meta name="description" content="We implement AI-powered systems that automate 60-80% of manual recruitment work. Helped a recruitment agency 2x revenue in 90 days. Book a free discovery call.">
```

### Performance
- Lazy-load images below the fold
- Preload Inter font
- Inline critical CSS for above-the-fold content
- Keep total page weight under 500KB (excluding Cal.com iframe)
- Use `loading="lazy"` on Cal.com iframe

---

## File Structure After Implementation

```
recruitment-os/
├── index.html          ← NEW: Landing page (replaces dashboard)
├── dashboard.html      ← MOVED: Current dashboard (renamed from old index.html)
├── app.js              ← Existing: Dashboard logic (unchanged)
├── styles.css          ← Existing: Dashboard styles (unchanged)
├── landing.css         ← NEW: Landing page styles
├── landing.js          ← NEW: Landing page interactions (scroll animations, FAQ accordion, count-up, header)
├── assets/
│   └── screenshots/    ← NEW: Product screenshots
├── n8n-transforms/     ← Existing
├── outputs/            ← Existing
└── README.md           ← Updated
```

---

## Review Checklist Before Build

- [ ] Confirm hero headline resonates (or suggest alternatives)
- [ ] Provide product screenshots (dashboard, analytics, table view)
- [ ] Confirm Cal.com embed works at `cal.com/prakarshgupta/ai-dev`
- [ ] Confirm Small Group logo (SVG or PNG)
- [ ] Any testimonial/quote from German client to include?
- [ ] LinkedIn profile URL for footer
- [ ] Confirm pricing is OK to show on the page (or remove FAQ pricing answer)
- [ ] Any legal requirements (privacy policy, terms)?

---

*This document defines the complete landing page structure. Once approved, implementation begins.*

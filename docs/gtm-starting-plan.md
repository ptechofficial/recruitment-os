# Recruitment OS — GTM Starting Plan

*Applied: PACE + 6-Step GTM + GTM Engineering frameworks from `_skills/gtm-engineering/`*

---

## PACE Analysis for Recruitment OS

### P — Pain (Positioning Lever)

Reframe around the **most urgent, expensive pain** — not features:

> **Primary pain frame:** "Your recruiters spend 3-4 hours/day on sourcing and admin. At $50/hr across 20 recruiters, that's **$60K/month bleeding out** on work an AI system handles in minutes."

> **Competitive fear frame:** "Your competitors are scanning 40,000 opportunities/day while your team manually checks 200. By the time you find a job opening, someone else already placed the candidate."

Competitive fear is the strongest B2B motivator — 80% buy to avoid pain, not gain upside.

### A — Audience (Where to Focus First)

| Filter | Best Segment |
|--------|-------------|
| **Pain** | Agencies with 15-50 recruiters — big enough to feel scaling pain, small enough that AI transformation is tractable |
| **Money** | $2M-$10M revenue agencies already paying for Bullhorn/Vincere ($15-50K/yr on tools) |
| **Expensive COI** | IT/Technical recruitment agencies — tech talent war means late sourcing = lost placements worth $15-30K each |

**Starting ICP (laser-focused):**
> IT/Technical recruitment agencies, 15-50 recruiters, $2M-$10M revenue, UK-based, using Bullhorn or Vincere, actively posting jobs on LinkedIn

Why UK first: timezone overlap with India, English-speaking, strong recruitment industry, smaller market to dominate before US.

### C — Channel

| Channel | Role | Weekly Effort |
|---------|------|---------------|
| **LinkedIn Outbound** | Primary acquisition — 50 targeted connections/week to ICP | 60% |
| **LinkedIn Content** | Authority building — 3 posts/week (case study angles, pain agitation, before/after) | 25% |
| **YouTube** | Long-term compounding asset — 1 video/week (searchable "recruitment AI" terms) | 15% |

**Skip for now:** Cold email, paid ads, communities. First 3-5 customers need high-touch, relationship-based selling. Paid ads come after messaging is validated through real conversations.

### E — Expansion (Built into the Offer)

- **Land:** $2,500 pilot (30 days, one system) — dead simple to say yes to
- **Expand:** Prove ROI → upsell to $7K/month full suite
- **Golden equation check:** If pilot costs ~$1K to deliver and converts to $7K/month, CAC pays back in month 1

---

## 6-Step Strategy Applied

### Step 1 — Target Market
IT/Technical recruitment agencies in UK, 15-50 recruiters

### Step 2 — Segmentation
Start with agencies using Bullhorn (largest ATS in UK recruitment). This makes integration pitch specific and case study transferable.

### Step 3 — Positioning

| Competitor Type | Their Weakness | Our Advantage |
|-----------------|---------------|---------------|
| Generic AI tools (ChatGPT, etc.) | DIY, no integration, no workflow | Done-for-you, 25-person team |
| Point solutions (HireEZ, SeekOut) | One function, self-serve, $500-2K/mo | 9 integrated systems, proven 2x result |
| Offshore VAs | Quality inconsistent, no AI layer | AI + human team, scalable, data-driven |
| Big consultancies (Deloitte, etc.) | $200K+, 6-12 months, enterprise only | $2.5K to start, 60-90 days, mid-market focused |

**White space:** Nobody is doing **done-for-you AI implementation specifically for mid-market recruitment agencies at the $2.5K-$7K price point.**

### Step 4 — Manifesto

> "Recruitment agencies are drowning in manual work while AI tools sit on the shelf because nobody has time to figure them out. We're the 25-person team that builds, integrates, and runs AI systems inside your agency — so your recruiters stop sourcing and start closing. We proved it works: 2x revenue in 90 days for a German agency. Now we're bringing it to UK tech recruiters."

### Step 5 — Broadway Show (Channels)
LinkedIn Outbound + LinkedIn Content + YouTube (see Channel table above). Master these three before adding anything else.

### Step 6 — Data & Iteration
Track weekly metrics (see table below). Every Friday: review numbers, adjust messaging, double down on what converts.

---

## Concrete 30-Day Execution Plan

### Week 1 — Build the List + Sharpen the Weapon

- [ ] Build a list of 200 UK IT/tech recruitment agencies (15-50 recruiters, Bullhorn users). Use LinkedIn Sales Navigator + Google + Bullhorn's customer directory
- [ ] Identify the founder/CEO/MD + Head of Operations at each
- [ ] Write 5 connection request variations (pain-first, not pitch-first):
  - *"Noticed [agency] is growing the tech recruitment team — curious how you're handling the sourcing volume at that scale?"*
- [ ] Write 3 LinkedIn posts: (1) German case study retold with numbers, (2) "200 vs 40,000 searches/day" contrast post, (3) "The real cost of manual sourcing" breakdown
- [ ] Refine Cal.com booking page for this specific ICP

### Week 2 — Start Outreach

- [ ] Send 50 connection requests (10/day, Mon-Fri)
- [ ] Publish first 2 LinkedIn posts
- [ ] Engage (comment meaningfully) on 10 posts/day from recruitment agency founders
- [ ] Follow up on accepted connections with value-first message (share an insight, not a pitch)
- [ ] Record 1 YouTube video: "How one recruitment agency doubled revenue with AI in 90 days"

### Week 3 — Conversations → Calls

- [ ] Send 50 more connection requests
- [ ] Publish 2 more LinkedIn posts
- [ ] Move warm conversations toward discovery calls: *"Happy to show you what the dashboard looks like for an agency your size — worth a 20 min look?"*
- [ ] Target: 3-5 discovery calls booked
- [ ] For each call: use the Straight Line system from `_skills/sales/` — build certainty in the Three 10s

### Week 4 — Close Pilots

- [ ] Continue outreach cadence (50 connections + 2 posts)
- [ ] Run discovery calls, send custom proposals
- [ ] Push for $2,500 pilot closes — use objection handling from `docs/gtm-strategy.md`
- [ ] **Target: 1-2 signed pilots**
- [ ] Document everything: what messages got replies, what objections came up, what converted

---

## Weekly Metrics to Track

| Metric | Week 1 | Week 2 | Week 3 | Week 4 |
|--------|--------|--------|--------|--------|
| Connections sent | 0 | 50 | 100 | 150 |
| Connections accepted | 0 | 15-20 | 30-40 | 45-60 |
| Conversations started | 0 | 5-8 | 10-15 | 15-20 |
| Discovery calls | 0 | 0-1 | 3-5 | 5-8 |
| Proposals sent | 0 | 0 | 1-2 | 3-5 |
| **Pilots signed** | 0 | 0 | 0 | **1-2** |

---

## GTM Engineering — Build After First 2 Customers

Once you have paying customers, build these agents with n8n:

1. **Lead Scoring Agent** — scrapes LinkedIn for agencies matching ICP criteria, scores them, pushes hot leads to a Google Sheet
2. **Outreach Personalization Agent** — takes a prospect's LinkedIn profile + agency website, generates a custom connection message
3. **Deal Intelligence Agent** — after a discovery call (Fathom transcript), auto-generates the proposal using template + call insights

Don't automate before you've manually done 50+ conversations and know what works.

---

## The Core GTM Asset: The German Case Study

Every post, every message, every call should orbit around: *"We doubled a recruitment agency's revenue in 90 days."*

10 ways to tell the story:

1. **The numbers version** — 200 → 40,000 daily searches
2. **The human version** — recruiters got their evenings back
3. **The competitive version** — they reached clients weeks before competitors
4. **The financial version** — $60K/month in manual labor eliminated
5. **The timeline version** — results in 90 days, not 12 months
6. **The scale version** — same team, 200x more coverage
7. **The risk version** — $2,500 pilot to prove it, not $200K consulting engagement
8. **The before/after version** — side-by-side daily workflow comparison
9. **The industry version** — "If a German agency can do it, why can't UK agencies?"
10. **The future version** — "This is what recruitment looks like in 2027. Some agencies are already there."

One case study, told well, beats a hundred feature descriptions.

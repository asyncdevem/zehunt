<h1 align="center">Zehunt — Product Requirements Document</h1>
<p align="center"><strong>Version 2.0</strong> · April 2026 · Beta Release</p>

---

## 1. Product Overview

### 1.1 Vision

Zehunt is a builder reputation and growth system that tracks how builders grow over time through real execution — not popularity, votes, or hype.

```
Building Activity → Measurable Reputation → Real-World Opportunities
```

### 1.2 Mission

Create a system where builders earn reputation through consistent execution and convert that reputation into tangible opportunities: hiring, collaboration, and funding.

### 1.3 Positioning

**Zehunt is:**
- A builder reputation and growth system

**Zehunt is not:**
- A product launch platform
- A voting-based discovery site
- A hype-driven showcase

---

## 2. Value Proposition

### For Builders

| Benefit | Description |
|---|---|
| Build in public | Share structured progress updates, not social posts |
| Track growth | Measurable reputation score based on real execution |
| Earn reputation | Consistency, shipping, and engagement compound over time |
| Unlock opportunities | Hiring, funding, and collaboration matched to your track record |

### For the Ecosystem

| Benefit | Description |
|---|---|
| Discover talent | Find high-signal builders based on execution, not followers |
| Track ability | See real shipping cadence, lifecycle progression, and consistency |
| Identify early | Spot emerging talent before they're widely known |
| Reduce noise | Filter out hype-driven platforms and vanity metrics |

---

## 3. System Architecture

### 3.1 High-Level Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js (App Router), Tailwind CSS | UI and server-side rendering |
| Backend | Next.js Route Handlers + Server Actions | API endpoints and mutations |
| Database | Supabase (PostgreSQL) | Data storage, auth, realtime |
| Auth | Supabase Auth | OAuth (GitHub, Google) + email/password |
| Realtime | Supabase Realtime | Live feed, notifications, score updates |
| Storage | Supabase Storage | Avatars, logos, media |
| Hosting | Vercel | Deployment, CDN, edge network |
| Scheduling | Supabase pg_cron | Score recalculation, ranking snapshots |

### 3.2 MCP Integration Layer (Future)

| Capability | Description |
|---|---|
| Read tools | Builder profiles, scores, rankings, feed updates, opportunities |
| Write tools | Structured updates, lifecycle stage transitions |
| Access model | Personal tokens, team connections, scoped permissions |
| Safety | Schema validation, rate limiting, audit logs, role-based access |

---

## 4. Core System Design

### 4.1 Builder System

The builder is the root entity. Everything flows from builder activity.

**Attributes:** Identity, skills/tech stack, activity history, reputation score (computed), role (builder/investor/recruiter).

### 4.2 Builder Event System

All activity is unified into a single, append-only event stream. This is the single source of truth for scoring, ranking, and analytics.

**Event types:** `product_created`, `product_updated`, `stage_changed`, `update_posted`, `comment_received`, `followed`, `opportunity_unlocked`, `score_milestone`, `team_joined`, `team_invited`, `member_removed`

### 4.3 Product System

Products are not the main entity — they are evidence of builder execution. Each product tracks lifecycle stages and feeds the builder's reputation score.

**Stages:** Idea → MVP → Beta → Growth

### 4.4 Reputation System

Reputation replaces votes as the core ranking mechanism.

| Component | Weight | Signals |
|---|---|---|
| Consistency | 30% | Active days per week, update frequency, streaks |
| Execution | 25% | Stage progression, shipped features, lifecycle transitions |
| Engagement Quality | 20% | Meaningful comments, thread depth, feedback received |
| Outcome Signals | 15% | Hiring, collaboration, funding interest |
| Social Proof | 10% | Followers, reactions (low weight) |

### 4.5 Feed System

Structured progress updates — not social posts. Types: shipped feature, stage change, milestone reached, lesson learned.

Feed behavior: prioritizes execution signals, not engagement-based ranking.

### 4.6 Opportunity Engine

Converts reputation into real opportunities based on builder score, activity frequency, skills, and stage maturity.

**Types:** Hiring matches, co-founder matches, startup collaboration, early funding interest.

### 4.7 Ranking System

| Category | Criteria |
|---|---|
| Rising Builders | 7-day score growth |
| Consistent Builders | 30-day stability |
| Breakout Builders | Velocity spike |
| Top Builders | Absolute score |

### 4.8 Collaborative Projects

Multiple builders can work on a single product as a team. Roles: Owner, Maintainer, Contributor. All team members earn shared reputation from the product's execution.

---

## 5. User Roles

| Role | Selected | Can Change | Primary Actions |
|---|---|---|---|
| Builder | Onboarding | Once | Create products, post updates, earn reputation |
| Investor | Onboarding | Once | Discover builders, express funding interest, manage watchlist |
| Recruiter | Onboarding | Once | Search builders, post opportunities, manage hiring pipeline |
| Admin | Assigned | N/A | Moderation, user management, score calibration |

---

## 6. Pages and UI Structure

### Public Pages
Home (builder-centric), Builder Discovery, Builder Profile, Products, Product Detail, Feed, Rankings, Search, Opportunities, Community Hub

### Authenticated Pages
Role-based Dashboards (Builder/Investor/Recruiter), Create Product, Edit Product, Team Management, Post Update, Edit Profile, Notifications, Feedback

### Admin Pages (Separate Layout)
Overview, User Management, Moderation Queue, Event Monitor, Score Calibration, Bug Reports, Ambassador Management, Newsletter

> See [Platform Screens](./platform-screens.md) for the complete route map with 38+ screens.

---

## 7. MVP Scope

### Phase 1 — Critical Foundation (Beta)
- Builder profiles with role selection
- Product creation (solo and collaborative)
- Builder event system (auto-emitted via triggers)
- Basic lifecycle tracking (Idea → MVP → Beta → Growth)
- Builder score v1 (5-component formula)
- Build-in-public updates
- Auth (GitHub + Google + email)
- Community and ambassador program
- Feedback and error reporting

### Phase 2 — Growth
- Reputation ranking system with snapshots
- Feed personalization
- Opportunity engine v1
- Comments and reactions
- Notifications with realtime
- MCP server v1 (read-only tools)

### Phase 3 — Scale
- AI scoring refinement
- Matchmaking system
- Funding and hiring integrations
- MCP write tools
- Team MCP access and enterprise policies

---

## 8. Growth Engine

### Core Loop

```
Builder creates product → Logs progress → Reputation increases →
Gets visibility and opportunities → More builders join
```

### Viral Mechanisms
- "Built on Zehunt" badge
- Public builder profile sharing
- Shareable activity timelines
- Ambassador program at universities
- Newsletter with builder spotlights

---

## 9. KPIs

### Core Metrics

| Metric | Description |
|---|---|
| Weekly active builders | Builders who posted at least 1 update |
| Builder retention (30-day) | % of builders active after 30 days |
| Event creation rate | Total events per day/week |
| Opportunity conversion rate | % of matches that lead to action |
| Ambassador onboards | Builders onboarded via ambassador referrals |

### Secondary Metrics

| Metric | Description |
|---|---|
| Average builder score growth | Week-over-week score increase |
| Updates per builder | Average updates posted per active builder |
| Collaboration matches | Team products created |
| Newsletter engagement | Open rate, click rate |

---

## 10. Monetization Strategy

| Phase | Model |
|---|---|
| Phase 1 | Free platform |
| Phase 2 | Featured builders, hiring access tools, advanced analytics |
| Phase 3 | Talent marketplace, investor access layer, enterprise recruitment APIs |

---

## 11. Security and Integrity

- Row-level security on all database tables
- Append-only event stream (immutable audit log)
- Rate limiting on all write operations
- Anti-spam content flagging and moderation queue
- Role change limited to one time (prevents gaming)
- Verified builder signals (future)

> See [Security Document](./security.md) for the complete security architecture.

---

<p align="center">
  <sub>Zehunt is a builder reputation and growth system that tracks execution over time and converts it into real-world opportunities.</sub>
</p>

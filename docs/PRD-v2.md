# ZE HUNT - Product Requirements Document (PRD v2)

## 1. Product Overview

### 1.1 Vision
Zehunt is a builder intelligence and reputation graph that tracks how builders grow over time through real execution, not popularity.

It transforms:

building activity -> measurable reputation -> real-world opportunities

### 1.2 Mission
To create a system where builders earn reputation through consistent execution and convert that reputation into opportunities such as hiring, collaboration, and funding.

### 1.3 Core Positioning
Zehunt is:
- A builder reputation and growth system

Zehunt is NOT:
- A product launch platform
- A voting-based discovery site
- A hype-driven showcase

## 2. Core Value Proposition

### For Builders
- Build in public with structure
- Track real growth over time
- Earn measurable reputation
- Unlock job, funding, and collaboration opportunities

### For Ecosystem
- Discover high-signal builders (not just products)
- Track real execution ability
- Identify emerging talent early
- Reduce noise from hype-based platforms

## 3. System Architecture (High Level)

### Frontend
- Next.js (App Router)
- Tailwind CSS
- React Query / Zustand

### Backend
- Node.js (NestJS or Express)
- PostgreSQL
- Prisma ORM

### Event System (Core Engine)
- Unified Builder Event Stream

### Realtime
- WebSockets / Supabase Realtime

### Storage
- Cloudflare R2 / Supabase Storage

### MCP Integration Layer
- Zehunt MCP Server (Model Context Protocol)
- OAuth/API key based authentication for MCP clients
- Scoped tools for reading builder profiles, rankings, updates, and opportunities
- Write tools for posting structured updates and lifecycle changes (with validation)

## 4. Core System Design

### 4.1 Builder System (Core Entity)
Concept:
Builder is the root entity of the entire system. Everything flows from builder activity.

Schema:
```sql
builders (
  id,
  name,
  username,
  bio,
  avatar_url,
  github_url,
  linkedin_url,
  created_at
)
```

Builder Attributes:
- Identity
- Skills / tech stack
- Activity history
- Reputation score (computed)

### 4.2 Builder Event System (CORE ENGINE)
Concept:
All activity is unified into a single event stream.

Schema:
```sql
builder_events (
  id,
  builder_id,
  type,
  entity_id,
  metadata JSONB,
  created_at
)
```

Event Types:
- PRODUCT_CREATED
- PRODUCT_UPDATED
- STAGE_CHANGED
- POST_CREATED
- COMMENT_RECEIVED
- FOLLOWED
- LAUNCHED
- OPPORTUNITY_UNLOCKED

Purpose:
- Single source of truth for growth
- Enables scoring, ranking, and analytics

### 4.3 Product System (Evidence Layer)
Concept:
Products are NOT the main entity. They are evidence of builder execution.

Schema:
```sql
products (
  id,
  builder_id,
  name,
  tagline,
  description,
  website_url,
  logo_url,
  created_at
)
```

### 4.4 Product Lifecycle System (Key Differentiator)
Stages:
- IDEA
- MVP
- BETA
- GROWTH

Schema:
```sql
product_lifecycle (
  id,
  product_id,
  stage,
  updated_at
)
```

Purpose:
- Tracks execution maturity
- Feeds builder score
- Enables progression visibility

### 4.5 Builder Reputation System (CORE ENGINE)
Concept:
Reputation replaces votes as the core ranking mechanism.

Builder Score Formula:

Builder Score =
(Consistency x 30%) +
(Execution x 25%) +
(Engagement Quality x 20%) +
(Outcome Signals x 15%) +
(Social Proof x 10%)

Components:
1. Consistency
- Active days per week
- Update frequency
- Event streaks

2. Execution
- Product stage progression
- Number of shipped features
- Completed lifecycle transitions

3. Engagement Quality
- Meaningful comments
- Thread depth
- Feedback received

4. Outcome Signals
- Hiring
- Collaboration
- Funding interest

5. Social Proof
- Followers
- Reactions (low weight only)

### 4.6 Build-in-Public System (Structured Feed)
Concept:
Not social posts; structured progress updates.

Schema:
```sql
updates (
  id,
  builder_id,
  product_id,
  content,
  type,
  created_at
)
```

Update Types:
- shipped feature
- stage change
- milestone reached
- lesson learned

Feed Behavior:
- Based on builder graph
- Prioritizes execution signals
- Not engagement-based ranking

### 4.7 Opportunity Engine (MONETIZATION CORE)
Concept:
Convert reputation into real opportunities.

Signals:
- Builder Score
- Activity frequency
- Skills graph
- Stage maturity

Opportunity Types:
- Hiring matches
- Co-founder matches
- Startup collaboration
- Early funding interest

Schema:
```sql
opportunities (
  id,
  type,
  builder_id,
  metadata,
  status,
  created_at
)
```

### 4.8 Ranking System
Replace "Trending Products" with:
- Rising Builders (7-day growth)
- Consistent Builders (30-day stability)
- Breakout Builders (velocity spike)
- Top Execution Builders

### 4.9 MCP Support (Ecosystem Access)
Concept:
Allow users, teams, and AI agents to connect directly to Zehunt through an MCP server.

Goal:
- Let external tools and AI assistants use Zehunt as a live builder intelligence source.
- Enable authenticated read and write workflows without needing full UI interaction.

Core MCP Capabilities:
- Read builder profile, score, and activity timeline
- Read rankings (rising, consistent, breakout)
- Read feed updates and opportunity matches
- Create structured builder updates
- Submit lifecycle stage transitions with validation

Access Model:
- Personal MCP connection via user account
- Team MCP connection for organization workspaces (future)
- Token scopes for least-privilege access (read-only, updates-write, admin)

Integrity and Safety:
- Event schema validation before writes
- Rate limiting and abuse detection on MCP endpoints
- Full audit logs for MCP actions
- Permission checks mapped to platform roles

## 5. Pages and UI Structure

### 5.1 Home Page (Builder-Centric)
- Rising Builders (primary)
- Active builders feed
- Build-in-public highlights

Remove:
- Product-first layout

### 5.2 Builder Profile
- Reputation score
- Activity graph
- Product timeline
- Updates feed
- Opportunities status

### 5.3 Product Page (Secondary)
- Product lifecycle
- Builder history
- Updates
- Minimal voting

### 5.4 Feed Page
- Builder updates only
- Structured progress posts

### 5.5 Opportunities Page
- Matches for builders
- Hiring visibility
- Collaboration suggestions

### 5.6 Admin Panel
- Moderation
- Event monitoring
- Score calibration

## 6. MVP Scope (Corrected)

### Phase 1 (Critical Foundation)
- Builder profiles
- Product creation
- Builder event system
- Basic lifecycle tracking
- Builder score v1
- Build-in-public updates

### Phase 2
- Reputation ranking system
- Feed personalization
- Rising builders leaderboard
- Opportunity engine v1
- MCP server v1 (read-only tools)

### Phase 3
- AI scoring refinement
- Matchmaking system
- Funding / hiring integrations
- MCP write tools (updates + lifecycle transitions)
- Team MCP access and scoped enterprise policies

## 7. Growth Engine

### Core Loop
- Builder builds product
- Logs progress
- Reputation increases
- Gets visibility and opportunities
- More builders join

### Viral Mechanism
- "Built on Zehunt" badge
- Public builder profile sharing
- Activity timelines shareable

## 8. KPIs

### Core Metrics
- Weekly active builders
- Builder retention (30-day)
- Event creation rate
- Opportunity conversion rate
- MCP connected accounts
- MCP tool call success rate

### Secondary Metrics
- Average builder score growth
- Updates per builder
- Collaboration matches
- MCP-generated updates as a share of total updates

## 9. Monetization Strategy

### Phase 1
- Free platform

### Phase 2
- Featured builders
- Hiring access tools
- Advanced analytics

### Phase 3
- Talent marketplace
- Investor access layer
- Enterprise recruitment APIs

## 10. Security and Integrity
- Anti-spam event validation
- Rate limiting on updates
- Verified builder signals (future)
- Event integrity checks

## Final Positioning (Locked)
Zehunt is a builder reputation and growth system that tracks execution over time and converts it into real-world opportunities.

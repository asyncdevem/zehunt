<h1 align="center">Zehunt Backend Architecture</h1>
<p align="center"><strong>Technical Specification</strong> · Version 2.0 · April 2026</p>

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Database Schema](#2-database-schema)
3. [Enums](#3-enums)
4. [Row-Level Security](#4-row-level-security-rls-strategy)
5. [Database Functions & Triggers](#5-database-functions--triggers)
6. [Next.js API Layer](#6-nextjs-api-layer)
7. [Storage Buckets](#7-supabase-storage-buckets)
8. [Realtime Subscriptions](#8-realtime-subscriptions)
9. [Indexing Strategy](#9-indexing-strategy)
10. [Auth Strategy](#10-auth-strategy)
11. [Additions Over PRD](#11-additions--improvements-over-prd)
12. [Migration Plan](#12-migration-plan-execution-order)
13. [Environment Variables](#13-environment-variables)
14. [Client Library Setup](#14-client-library-setup)
15. [Phase 1 MVP Scope](#15-phase-1-mvp-backend-scope)

---

## 1. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | Unified frontend + backend — API routes, server actions, and middleware in one codebase |
| API | Next.js Route Handlers (`app/api/`) | RESTful endpoints for all CRUD operations and complex business logic |
| Server Logic | Next.js Server Actions | Form submissions, mutations, and data writes directly from server components |
| Database | Supabase (PostgreSQL) | Managed Postgres with built-in auth, realtime, and storage |
| Auth | Supabase Auth + Next.js Middleware | OAuth providers + session management via `@supabase/ssr` and Next.js middleware |
| Realtime | Supabase Realtime | Live feed updates, notifications, score changes via Postgres changes |
| Storage | Supabase Storage | Avatars, product logos, builder media |
| Scheduling | Supabase pg_cron | Periodic score recalculation, streak checks, ranking snapshots — all scheduled inside Postgres |
| Search | pg_trgm + GIN indexes | Full-text and fuzzy search on builders, products, updates |

> **Decision: Next.js as the backend over NestJS/Express**
> The PRD suggested NestJS or Express as a separate backend. Instead, we use Next.js itself as the backend layer. Route Handlers (`app/api/`) serve as RESTful API endpoints, Server Actions handle mutations from components, and middleware manages auth sessions. This keeps the entire stack in one deployable unit, eliminates cross-origin concerns, and simplifies deployment on Vercel. Supabase remains the database and auth provider — Next.js is the application server that talks to it.

---

## 2. Database Schema

### 2.1 Core Tables

#### `profiles` (extends Supabase auth.users)
```sql
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'builder',
  role_changed BOOLEAN DEFAULT FALSE,  -- true after first role change (one-time only)
  bio TEXT,
  avatar_url TEXT,
  company TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  location TEXT,
  skills TEXT[],              -- tech stack tags
  is_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `products`
```sql
products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  website_url TEXT,
  repo_url TEXT,              -- GitHub/GitLab repo link for open-source projects
  logo_url TEXT,
  current_stage product_stage NOT NULL DEFAULT 'idea',
  is_published BOOLEAN DEFAULT FALSE,
  is_collaborative BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `product_members` (collaborative teams)
```sql
product_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  builder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role member_role NOT NULL DEFAULT 'contributor',
  invited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status member_status NOT NULL DEFAULT 'pending',
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, builder_id)
);
```

#### `product_lifecycle`
```sql
product_lifecycle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  from_stage product_stage,
  to_stage product_stage NOT NULL,
  notes TEXT,
  transitioned_at TIMESTAMPTZ DEFAULT now()
);
```

#### `builder_events` (core event stream)
```sql
builder_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type event_type NOT NULL,
  entity_type TEXT,           -- 'product', 'update', 'opportunity', etc.
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `updates` (build-in-public feed)
```sql
updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  type update_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `opportunities`
```sql
opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type opportunity_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  builder_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  posted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  fit_score INTEGER,
  status opportunity_status DEFAULT 'open',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.2 Reputation & Ranking Tables

#### `builder_scores`
```sql
builder_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_score INTEGER NOT NULL DEFAULT 0,
  consistency_score INTEGER DEFAULT 0,
  execution_score INTEGER DEFAULT 0,
  engagement_score INTEGER DEFAULT 0,
  outcome_score INTEGER DEFAULT 0,
  social_proof_score INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  recalculated_at TIMESTAMPTZ DEFAULT now()
);
```

#### `ranking_snapshots`
```sql
ranking_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  total_score INTEGER NOT NULL,
  category ranking_category NOT NULL,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(builder_id, category, snapshot_date)
);
```

### 2.3 Social & Engagement Tables

#### `follows`
```sql
follows (
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);
```

#### `reactions`
```sql
reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,  -- 'update', 'product'
  entity_id UUID NOT NULL,
  type reaction_type NOT NULL DEFAULT 'fire',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, entity_type, entity_id)
);
```

#### `comments`
```sql
comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,  -- 'update', 'product'
  entity_id UUID NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.4 Notifications

#### `notifications`
```sql
notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  entity_type TEXT,
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.5 Feedback & Reports

#### `feedback_reports`
```sql
feedback_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type feedback_type NOT NULL,
  severity feedback_severity NOT NULL DEFAULT 'medium',
  page TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  screenshot_url TEXT,
  status feedback_status NOT NULL DEFAULT 'open',
  admin_notes TEXT,
  resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.6 Community & Ambassadors

#### `ambassador_applications`
```sql
ambassador_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  university TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Pakistan',
  degree_program TEXT,
  graduation_year INTEGER,
  linkedin_url TEXT,
  zehunt_username TEXT,
  motivation TEXT NOT NULL,
  planned_activities TEXT,
  expected_onboards TEXT,
  status ambassador_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `ambassadors` (accepted ambassadors)
```sql
ambassadors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES ambassador_applications(id),
  university TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  builders_onboarded INTEGER DEFAULT 0,
  events_hosted INTEGER DEFAULT 0,
  ambassador_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  activated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);
```

#### `newsletter_subscribers`
```sql
newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  source TEXT DEFAULT 'website',          -- 'website', 'onboarding', 'ambassador_referral'
  is_subscribed BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### `email_campaigns`
```sql
email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  preview_text TEXT,
  body TEXT NOT NULL,
  audience TEXT NOT NULL DEFAULT 'all',   -- 'all', 'builders', 'investors', 'recruiters', 'ambassadors', 'newsletter'
  status email_campaign_status NOT NULL DEFAULT 'draft',
  sent_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  recipients_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 3. Enums

```sql
-- User roles (selected during onboarding, one-time change allowed)
CREATE TYPE user_role AS ENUM ('builder', 'investor', 'recruiter');

-- Product lifecycle stages
CREATE TYPE product_stage AS ENUM ('idea', 'mvp', 'beta', 'growth');

-- Product member roles (collaborative projects)
CREATE TYPE member_role AS ENUM ('owner', 'maintainer', 'contributor');

-- Product member invitation status
CREATE TYPE member_status AS ENUM ('pending', 'accepted', 'declined');

-- Builder event types
CREATE TYPE event_type AS ENUM (
  'product_created', 'product_updated', 'stage_changed',
  'update_posted', 'comment_received', 'followed',
  'opportunity_unlocked', 'score_milestone',
  'team_joined', 'team_invited', 'member_removed'
);

-- Update types (build-in-public)
CREATE TYPE update_type AS ENUM (
  'shipped_feature', 'stage_change', 'milestone_reached', 'lesson_learned'
);

-- Opportunity types
CREATE TYPE opportunity_type AS ENUM (
  'hiring', 'collaboration', 'cofounder', 'funding'
);

-- Opportunity status
CREATE TYPE opportunity_status AS ENUM (
  'open', 'pending', 'active', 'closed'
);

-- Ranking categories
CREATE TYPE ranking_category AS ENUM (
  'rising', 'consistent', 'breakout', 'top_execution'
);

-- Reaction types
CREATE TYPE reaction_type AS ENUM ('fire', 'rocket', 'clap', 'lightbulb');

-- Notification types
CREATE TYPE notification_type AS ENUM (
  'new_follower', 'new_comment', 'new_reaction',
  'opportunity_match', 'score_change', 'stage_transition',
  'team_invite', 'team_update',
  'system'
);

-- Feedback report types
CREATE TYPE feedback_type AS ENUM ('bug', 'feedback', 'feature_request');

-- Feedback severity
CREATE TYPE feedback_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Feedback status
CREATE TYPE feedback_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- Ambassador application status
CREATE TYPE ambassador_status AS ENUM ('pending', 'accepted', 'rejected');

-- Email campaign status
CREATE TYPE email_campaign_status AS ENUM ('draft', 'scheduled', 'sent');
```

---

## 4. Row-Level Security (RLS) Strategy

Every table has RLS enabled. Policies follow least-privilege:

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| profiles | Public (read all) | Auth (own via trigger) | Auth (own only) | None |
| products | Public (published) | Auth (own) | Auth (own or team maintainer+) | Auth (own) |
| product_members | Public (accepted members) | Auth (product owner/maintainer) | Auth (own status or product owner) | Auth (product owner) |
| builder_events | Public (read) | System only (via triggers/functions) | None | None |
| updates | Public (read) | Auth (own) | Auth (own) | Auth (own) |
| opportunities | Auth (matched or posted_by) | Auth/Admin | Auth (own) | Admin |
| builder_scores | Public (read) | System only | System only | None |
| follows | Public (read) | Auth (own follower_id) | None | Auth (own) |
| reactions | Public (read) | Auth (own) | None | Auth (own) |
| comments | Public (read) | Auth (own) | Auth (own) | Auth (own) |
| notifications | Auth (own only) | System only | Auth (own, is_read only) | Auth (own) |
| ranking_snapshots | Public (read) | System only | None | None |

"System only" = inserted via database triggers or `security definer` functions (bypasses RLS).

---

## 5. Database Functions & Triggers

### 5.1 Auto-create profile on signup
```
TRIGGER: on auth.users INSERT
ACTION: Create a profiles row with id = new user id
```

### 5.2 Auto-emit builder events
```
TRIGGER: on products INSERT → emit 'product_created' event
TRIGGER: on product_lifecycle INSERT → emit 'stage_changed' event
TRIGGER: on updates INSERT → emit 'update_posted' event
TRIGGER: on follows INSERT → emit 'followed' event
TRIGGER: on comments INSERT → emit 'comment_received' event
TRIGGER: on product_members INSERT (status='accepted') → emit 'team_joined' event
TRIGGER: on product_members INSERT (status='pending') → emit 'team_invited' event
```

### 5.3 Auto-update product stage
```
TRIGGER: on product_lifecycle INSERT
ACTION: UPDATE products SET current_stage = NEW.to_stage WHERE id = NEW.product_id
```

### 5.4 Auto-generate notifications
```
TRIGGER: on follows INSERT → notify the followed user
TRIGGER: on comments INSERT → notify the entity owner
TRIGGER: on reactions INSERT → notify the entity owner
TRIGGER: on opportunities INSERT/UPDATE → notify matched builder
TRIGGER: on product_members INSERT (status='pending') → notify invited builder
TRIGGER: on product_members UPDATE (status='accepted') → notify product owner
TRIGGER: on updates INSERT (collaborative product) → notify all team members
```

### 5.5 Score recalculation (pg_cron)
```
SCHEDULE: Every 1 hour via pg_cron
ACTION: Call recalculate_builder_scores() — a security definer function
  - Query builder_events in rolling windows (7d, 30d)
  - Compute each score component
  - Upsert into builder_scores
```

### 5.6 Ranking snapshots (pg_cron)
```
SCHEDULE: Daily at 00:00 UTC via pg_cron
ACTION: Call snapshot_rankings() — a security definer function
  - Compute rising (7d score delta)
  - Compute consistent (30d low variance)
  - Compute breakout (velocity spike)
  - Compute top_execution (absolute score)
  - Insert into ranking_snapshots
```

### 5.7 Streak tracking
```
FUNCTION: update_streak(builder_id)
  - Called during score recalculation
  - Checks consecutive days with at least 1 event
  - Updates builder_scores.streak_days
```

---

## 6. Next.js API Layer

All backend logic lives inside the Next.js app. No separate server needed.

### 6.1 Route Handlers (`app/api/`)

| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/auth/callback` | GET | OAuth callback handler for Supabase Auth | Public |
| `/api/builders` | GET | List/search builders with pagination | Public |
| `/api/builders/[username]` | GET | Get builder profile with scores | Public |
| `/api/builders/[username]/events` | GET | Get builder activity timeline | Public |
| `/api/products` | GET, POST | List products / create new product | Public read, Auth write |
| `/api/products/[id]` | GET, PATCH, DELETE | Product CRUD | Public read, Auth write (own) |
| `/api/products/[id]/lifecycle` | POST | Transition product stage | Auth (own) |
| `/api/updates` | GET, POST | List feed / post update | Public read, Auth write |
| `/api/updates/[id]` | GET, PATCH, DELETE | Update CRUD | Public read, Auth write (own) |
| `/api/follows` | POST, DELETE | Follow/unfollow a builder | Auth |
| `/api/products/[id]/members` | GET, POST | List team / invite member | Public read, Auth write (owner/maintainer) |
| `/api/products/[id]/members/[memberId]` | PATCH, DELETE | Update role or status / remove member | Auth (owner or self for accept/decline) |

### 6.2 Server Actions (`app/actions/`)

Used for form-driven mutations in server components:

| Action | Purpose |
|---|---|
| `createProduct` | Create a new product from form data |
| `updateProduct` | Edit product details |
| `postUpdate` | Submit a build-in-public update |
| `transitionStage` | Move product to next lifecycle stage |
| `toggleFollow` | Follow or unfollow a builder |
| `inviteTeamMember` | Invite a builder to a collaborative product |
| `respondToInvite` | Accept or decline a team invitation |
| `updateMemberRole` | Change a team member's role (owner/maintainer/contributor) |
| `removeMember` | Remove a member from a collaborative product |
| `updateProfile` | Edit own profile (bio, links, skills) |
| `uploadAvatar` | Upload profile photo to Supabase Storage |
| `uploadProductLogo` | Upload product logo to Supabase Storage |

### 6.3 Middleware (`middleware.ts`)

- Refreshes Supabase auth session on every request
- Protects routes that require authentication (redirects to `/login`)
- Sets user context for server components

### 6.4 Project Structure (Backend Files)

```
app/
├── api/
│   ├── auth/
│   │   └── callback/route.ts
│   ├── builders/
│   │   ├── route.ts
│   │   └── [username]/
│   │       ├── route.ts
│   │       └── events/route.ts
│   ├── products/
│   │   ├── route.ts
│   │   └── [id]/
│   │       ├── route.ts
│   │       └── lifecycle/route.ts
│   ├── updates/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── follows/
│   │   └── route.ts
├── actions/
│   ├── products.ts
│   ├── updates.ts
│   ├── profile.ts
│   ├── follows.ts
│   └── uploads.ts
├── lib/
│   └── supabase/
│       ├── client.ts          -- Browser client (client components)
│       ├── server.ts          -- Server client (server components, actions, route handlers)
│       └── admin.ts           -- Service role client (cron jobs, system operations)
└── middleware.ts
```

---

## 7. Supabase Storage Buckets

| Bucket | Purpose | Access |
|---|---|---|
| `avatars` | Builder profile photos | Public read, auth write (own) |
| `product-logos` | Product logo images | Public read, auth write (own) |
| `update-media` | Images/files attached to updates | Public read, auth write (own) |

Max file size: 5MB. Allowed types: `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`.

---

## 8. Realtime Subscriptions

| Channel | Use Case |
|---|---|
| `builder_events` (filtered by builder_id) | Live activity feed on builder profiles |
| `updates` | Global feed page live updates |
| `notifications` (filtered by user_id) | Real-time notification bell |
| `builder_scores` (filtered by builder_id) | Live score changes on profile |

---

## 9. Indexing Strategy

```sql
-- Performance-critical indexes
CREATE INDEX idx_builder_events_builder_id ON builder_events(builder_id);
CREATE INDEX idx_builder_events_type ON builder_events(type);
CREATE INDEX idx_builder_events_created_at ON builder_events(created_at DESC);
CREATE INDEX idx_builder_events_builder_created ON builder_events(builder_id, created_at DESC);

CREATE INDEX idx_products_builder_id ON products(builder_id);
CREATE INDEX idx_products_stage ON products(current_stage);

CREATE INDEX idx_updates_builder_id ON updates(builder_id);
CREATE INDEX idx_updates_created_at ON updates(created_at DESC);

CREATE INDEX idx_builder_scores_total ON builder_scores(total_score DESC);

CREATE INDEX idx_follows_following ON follows(following_id);

CREATE INDEX idx_product_members_product ON product_members(product_id);
CREATE INDEX idx_product_members_builder ON product_members(builder_id);

CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);

CREATE INDEX idx_ranking_snapshots_category_date ON ranking_snapshots(category, snapshot_date DESC);

-- Search indexes
CREATE INDEX idx_profiles_username_trgm ON profiles USING gin(username gin_trgm_ops);
CREATE INDEX idx_profiles_display_name_trgm ON profiles USING gin(display_name gin_trgm_ops);
CREATE INDEX idx_products_name_trgm ON products USING gin(name gin_trgm_ops);
```

---

## 10. Auth Strategy

### Providers (Phase 1)
- GitHub OAuth (primary — builders are developers)
- Google OAuth
- Email + password (fallback)

### Providers (Phase 2)
- LinkedIn OAuth (professional identity)
- Magic link (passwordless)

### Session
- Supabase handles JWT sessions via `@supabase/ssr`
- Next.js `middleware.ts` refreshes the session on every request
- Server components and route handlers access the session via the server Supabase client
- Protected routes redirect unauthenticated users to `/login`

---

## 11. Additions & Improvements Over PRD

These are capabilities not in the PRD that strengthen the platform:

### 11.1 Notifications System
The PRD has no mention of notifications. Builders need to know when someone follows them, comments on their update, or when an opportunity matches. Added `notifications` table with realtime subscriptions.

### 11.2 Comments & Reactions
The PRD mentions "engagement quality" and "thread depth" as score components but doesn't define the tables. Added `comments` (with threading via parent_id) and `reactions` tables.

### 11.3 Follows Table
The PRD mentions followers as a social proof signal but doesn't define the relationship. Added `follows` with self-follow prevention.

### 11.4 Ranking Snapshots
The PRD describes ranking categories but not how they persist over time. Added `ranking_snapshots` for historical tracking, enabling "rising" and "breakout" calculations that need time-series data.

### 11.5 Search Infrastructure
Added trigram indexes for fuzzy search on builder names/usernames and product names. This enables the discovery experience without a separate search service.

### 11.6 Audit-Ready Event Stream
`builder_events` is append-only with no UPDATE/DELETE policies. This creates an immutable audit log of all platform activity, which also supports the MCP integrity requirements from the PRD.

### 11.7 Soft Validation via Enums
Using Postgres enums for stages, event types, update types, etc. ensures data integrity at the database level rather than relying on application-layer validation alone.

### 11.8 `updated_at` Auto-Tracking
Profiles, products, opportunities, and comments have `updated_at` columns managed by triggers, enabling cache invalidation and "last edited" displays.

### 11.9 Collaborative / Open-Source Projects
The PRD models products as single-builder entities. Added `product_members` table with roles (owner, maintainer, contributor) and invitation flow. This enables:
- Multiple builders working on one product
- Shared reputation credit from team execution
- Open-source project tracking with repo links
- Team activity feeds and notifications
- Invitation system with accept/decline flow

---

## 12. Migration Plan (Execution Order)

Migrations should be applied in this order to respect foreign key dependencies:

1. **Enable extensions** — `pg_trgm`, `pgcrypto` (if not already enabled)
2. **Create enums** — All custom types
3. **Create `profiles`** — Core identity table + auto-create trigger on auth.users
4. **Create `products`** — Depends on profiles
5. **Create `product_members`** — Depends on products and profiles
6. **Create `product_lifecycle`** — Depends on products
7. **Create `builder_events`** — Depends on profiles
8. **Create `updates`** — Depends on profiles, products
9. **Create `opportunities`** — Depends on profiles
10. **Create `builder_scores`** — Depends on profiles
11. **Create `ranking_snapshots`** — Depends on profiles
12. **Create `follows`** — Depends on profiles
13. **Create `reactions`** — Depends on profiles
14. **Create `comments`** — Depends on profiles (self-referencing)
15. **Create `notifications`** — Depends on profiles
16. **Create indexes** — All performance indexes
17. **Enable RLS + policies** — All tables
18. **Create triggers** — Event emission, auto-profile, auto-stage-update, notifications
19. **Create functions** — Score recalculation, ranking snapshots, streak tracking
20. **Schedule pg_cron jobs** — Hourly score recalculation, daily ranking snapshots

Post-migration (application layer):
20. **Set up Supabase client utilities** — `client.ts`, `server.ts`, `admin.ts`
21. **Create `middleware.ts`** — Auth session refresh
22. **Build API route handlers** — All `/api/` routes
23. **Build server actions** — All `/actions/` files

---

## 13. Environment Variables

```env
# Public (exposed to browser)
NEXT_PUBLIC_SUPABASE_URL=https://kukxavevefmlvxmwxssj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable_anon_key>

# Server-only (never exposed to browser)
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

---

## 14. Client Library Setup

```
npm install @supabase/supabase-js @supabase/ssr
```

Utility files:
- `app/lib/supabase/client.ts` — Browser client (for client components, uses `createBrowserClient`)
- `app/lib/supabase/server.ts` — Server client (for server components, actions, and route handlers, uses `createServerClient` with cookies)
- `app/lib/supabase/admin.ts` — Service role client (for cron jobs and system operations that bypass RLS)
- `middleware.ts` — Session refresh middleware (uses `createServerClient` to update auth cookies on every request)

---

## 15. Phase 1 MVP Backend Scope

What gets built first:

- [x] Supabase client utilities (browser, server, admin)
- [x] Auth middleware (session refresh, route protection)
- [x] Auth callback route (`/api/auth/callback`)
- [x] Profiles (auto-created on signup)
- [x] Products API routes + server actions (CRUD)
- [x] Product lifecycle (stage transitions)
- [x] Builder events (auto-emitted via triggers)
- [x] Updates API routes + server actions (build-in-public posts)
- [x] Builder scores (basic calculation)
- [x] Follows API route + server action
- [x] Auth (GitHub + Google + email)
- [x] RLS on all tables
- [x] Storage buckets (avatars, logos)

Deferred to Phase 2:
- Opportunities engine (API routes + matching logic)
- Comments & reactions (API routes + triggers)
- Notifications (table + realtime subscriptions)
- Ranking snapshots & pg_cron jobs
- Search (trigram indexes + search API route)
- MCP server

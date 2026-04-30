<h1 align="center">Zehunt Platform Screens</h1>
<p align="center"><strong>Complete Route Map & Screen Inventory</strong> · Beta Release · 38+ Screens</p>

---

## Table of Contents

1. [Public Pages](#1-public-pages)
2. [Authentication & Onboarding](#2-authentication--onboarding)
3. [Role-Based Dashboards](#3-role-based-dashboards)
4. [Investor Pages](#4-investor-pages)
5. [Recruiter Pages](#5-recruiter-pages)
6. [Builder Actions](#6-builder-actions)
7. [Community & Ambassadors](#7-community--ambassadors)
8. [Platform Features](#8-platform-features)
9. [Admin Dashboard](#9-admin-dashboard)
10. [Error Handling](#10-error-handling)
11. [Persistent UI Elements](#11-persistent-ui-elements)
12. [User Roles](#12-user-roles)
13. [Collaborative Projects](#13-collaborative-projects)
14. [Design System Reference](#14-design-system-reference)

---

## 1. Public Pages

Accessible without authentication.

| Route | Screen | Description |
|---|---|---|
| `/` | Home | Builder-centric landing page with rising builders, score framework, and opportunity matching overview |
| `/login` | Login | Email/password form with OAuth buttons (GitHub, Google) |
| `/signup` | Signup | Account creation with full name, username, email, and password |
| `/builders` | Builder Discovery | Ranked list of builders with scores, streaks, momentum, and focus areas |
| `/builders/[username]` | Builder Profile | Score breakdown (5 components), products, recent updates, and opportunity status |
| `/products` | Products | Grid of products with lifecycle stages and builder links |
| `/products/[id]` | Product Detail | Product timeline, recent activity, team members, and repository link |
| `/feed` | Activity Feed | Structured progress updates with type icons and stage badges |
| `/rankings` | Builder Rankings | Three-lane rankings: Rising, Consistent, and Breakout builders |
| `/search` | Search | Search builders and products by name, username, skills, or stage |
| `/opportunities` | Opportunities | Hiring, collaboration, and funding matches with fit scores |
| `/community` | Community Hub | University chapters, ambassador program, newsletter signup, global stats |

---

## 2. Authentication & Onboarding

Post-signup flow that determines the user's role and profile.

| Route | Screen | Description |
|---|---|---|
| `/onboarding` | Role Selection (Step 1) | Choose role: Builder, Investor, or Recruiter with perks overview |
| `/onboarding/identity` | Identity Setup (Step 2) | Avatar, username, display name, bio, location, company |
| `/onboarding/details` | Details (Step 3) | Skills/tech stack tags, social links (GitHub, LinkedIn, Twitter, website) |

---

## 3. Role-Based Dashboards

Each role sees a different dashboard after login.

| Route | Role | Key Sections |
|---|---|---|
| `/dashboard` | All | Auto-redirect to the correct role dashboard |
| `/dashboard/builder` | Builder | Score overview, products list, recent updates, opportunities, quick stats |
| `/dashboard/investor` | Investor | Builder trends, rising builders, watchlist, funding pipeline |
| `/dashboard/recruiter` | Recruiter | Builder search with filters, hiring pipeline, top matches, open roles |

---

## 4. Investor Pages

| Route | Screen | Key Features |
|---|---|---|
| `/dashboard/investor` | Dashboard | 4 trend metrics, rising builders, watchlist preview, funding pipeline |
| `/dashboard/investor/watchlist` | Watchlist | Full builder list with score components, notes, weekly score changes |
| `/dashboard/investor/funding` | Funding Pipeline | All funding expressions with status tracking, amounts, and fit scores |

---

## 5. Recruiter Pages

| Route | Screen | Key Features |
|---|---|---|
| `/dashboard/recruiter` | Dashboard | Search bar, hiring pipeline, top matches, open roles, stats |
| `/dashboard/recruiter/opportunities` | Manage Opportunities | Posted roles with match counts, applicants, edit/delete actions |
| `/dashboard/recruiter/opportunities/new` | Post Opportunity | Role title, description, required skills, min score, location, compensation |

---

## 6. Builder Actions

Authenticated pages for builder-specific workflows.

| Route | Screen | Key Features |
|---|---|---|
| `/products/new` | Create Product | Product details, collaborative toggle, repo URL, team invite, lifecycle preview |
| `/products/[id]/edit` | Edit Product | Edit details, update product stage, danger zone (delete) |
| `/products/[id]/team` | Team Management | Member list with roles, pending invites, invite form, repo link |
| `/updates/new` | Post Update | Update type, product selector, content, publish/draft |
| `/settings/profile` | Edit Profile | Avatar, display name, username, bio, skills, social links |

---

## 7. Community & Ambassadors

| Route | Screen | Key Features |
|---|---|---|
| `/community` | Community Hub | Stats, ambassador CTA, university chapters, newsletter signup |
| `/community/ambassadors` | Ambassador Application | Full form with university, motivation, planned activities, perks, timeline |
| `/community/ambassadors/dashboard` | Ambassador Dashboard | Onboard stats, referral link, chapter leaderboard, events, resources |

---

## 8. Platform Features

| Route | Screen | Key Features |
|---|---|---|
| `/notifications` | Notifications | Unread/read states, type-specific icons, mark all read |
| `/feedback` | Bug Report / Feedback | Type selector, severity, page, description, screenshot upload |

---

## 9. Admin Dashboard

The admin dashboard has its own layout with a dark sidebar, separate from the user-facing platform shell.

| Route | Screen | Key Features |
|---|---|---|
| `/admin` | Overview | Stats grid, live event stream, quick action links |
| `/admin/users` | User Management | User list, role badges, verify/admin/suspend actions, search |
| `/admin/moderation` | Moderation Queue | Flagged content, severity levels, approve/reject/ban actions |
| `/admin/events` | Event Monitor | Real-time event stream with type colors and timestamps |
| `/admin/scores` | Score Calibration | Weight sliders, recalculate button, score distribution chart |
| `/admin/reports` | Bug Reports | User-submitted reports with severity and status management |
| `/admin/ambassadors` | Ambassador Management | Application review with accept/reject actions |
| `/admin/newsletter` | Newsletter | Email composer with audience targeting, send history with analytics |

**Admin Layout Features:**
- Dark sidebar with 8 navigation items
- Zehunt logo with "Admin" badge
- "Back to Platform" link
- Completely separate from the user-facing `PlatformShell`

---

## 10. Error Handling

| File | Screen | Description |
|---|---|---|
| `app/not-found.tsx` | 404 Page | Branded hand-drawn 404 with links to home and search |
| `app/error.tsx` | Route Error | Error boundary with retry button, error ID, and report link |
| `app/global-error.tsx` | Global Error | Root-level catch-all with inline styles (no component dependencies) |

---

## 11. Persistent UI Elements

| Component | Location | Description |
|---|---|---|
| `PlatformShell` | All platform pages | Sticky header with navigation, search, notifications, and "Create Update" button |
| `FeedbackButton` | All pages (root layout) | Fixed bottom-right floating button linking to `/feedback` |

---

## 12. User Roles

| Role | Selected During | Can Change | Dashboard | Accent Color |
|---|---|---|---|---|
| Builder | Onboarding | Once | `/dashboard/builder` | `#ff4d4d` (Red) |
| Investor | Onboarding | Once | `/dashboard/investor` | `#2d5da1` (Blue) |
| Recruiter | Onboarding | Once | `/dashboard/recruiter` | `#e5880a` (Orange) |
| Admin | Assigned by admin | N/A | `/admin` | `#2d2d2d` (Dark) |

---

## 13. Collaborative Projects

| Feature | Location | Description |
|---|---|---|
| Team toggle | `/products/new` | Enable collaboration during product creation |
| Repository URL | `/products/new`, `/products/[id]/team` | Link to GitHub/GitLab for open-source visibility |
| Team invite | `/products/new`, `/products/[id]/team` | Search by username, assign role (Maintainer/Contributor) |
| Team display | `/products/[id]` | Team members shown with avatars and repository link |
| Role management | `/products/[id]/team` | Change roles, remove members, view pending invites |
| Shared reputation | Automatic | All team members earn reputation from product activity |

---

## 14. Design System Reference

| Element | Component | Description |
|---|---|---|
| Cards | `WobblyCard` | 3px border, hand-drawn radius, 4px hard shadow, optional rotation |
| Buttons | `WobblyButton` | Primary (white → red) and secondary (muted → blue) variants |
| Labels | `StickyLabel` | Yellow dashed border, uppercase, small text |
| Badges | `RoughPill` | Cream background, 2px border, organic radius |
| Fonts | Kalam / Patrick Hand | Headings (700) / Body (400) |
| Icons | `lucide-react` | strokeWidth 2.5–2.8 |

> See [Design System](./design-system-hand-drawn.md) for the complete specification.

---

## Screen Count Summary

| Category | Count |
|---|---|
| Public pages | 12 |
| Onboarding steps | 3 |
| Role-based dashboards | 4 |
| Investor pages | 3 |
| Recruiter pages | 3 |
| Builder action pages | 5 |
| Community pages | 3 |
| Platform feature pages | 2 |
| Admin pages | 8 |
| Error pages | 3 |
| Persistent UI components | 2 |
| **Total** | **38+** |

---

<p align="center">
  <sub>Zehunt Platform Screens · Beta Release · April 2026</sub>
</p>

<h1 align="center">Zehunt Security Document</h1>
<p align="center"><strong>Security Architecture, Policies & Practices</strong> · Version 1.0</p>

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication](#2-authentication)
3. [Authorization](#3-authorization)
4. [Data Protection](#4-data-protection)
5. [API Security](#5-api-security)
6. [Anti-Abuse & Integrity](#6-anti-abuse--integrity)
7. [Infrastructure Security](#7-infrastructure-security)
8. [Monitoring & Incident Response](#8-monitoring--incident-response)
9. [Compliance](#9-compliance)
10. [Pre-Launch Checklist](#10-pre-launch-checklist)

---

## 1. Overview

This document defines the security architecture for the Zehunt platform. It covers authentication, authorization, data protection, infrastructure security, and incident response procedures.

**Key principles:**
- Defense in depth — security at every layer (database, API, application, infrastructure)
- Least privilege — users and services only access what they need
- Immutability — the event stream is append-only for audit integrity
- Managed services — Supabase and Vercel handle infrastructure security, reducing custom attack surface

---

## 2. Authentication

### 2.1 Provider

| Property | Detail |
|---|---|
| Provider | Supabase Auth |
| Session type | JWT-based with short-lived access tokens (1 hour) |
| Token storage | HTTP-only cookies (not localStorage) |
| Session refresh | `middleware.ts` refreshes on every request via `@supabase/ssr` |

### 2.2 Supported Methods

| Method | Phase | Notes |
|---|---|---|
| Email + Password | 1 | Minimum 8 characters, bcrypt hashed |
| GitHub OAuth | 1 | Primary method for builders |
| Google OAuth | 1 | Secondary option |
| LinkedIn OAuth | 2 | Professional identity verification |
| Magic Link | 2 | Passwordless login via email |

### 2.3 Session Security

- Refresh tokens stored in HTTP-only, Secure, SameSite=Lax cookies
- Sessions invalidated on logout
- No session data in client-accessible storage (localStorage, sessionStorage)
- Rate limiting on login attempts (5 per 15 minutes, Supabase built-in)
- Password reset via email link only

---

## 3. Authorization

### 3.1 Role System

| Role | Assignment | Permissions |
|---|---|---|
| Visitor | Unauthenticated | Read-only access to public pages |
| Builder | Self-selected at onboarding | Create products, post updates, manage profile |
| Investor | Self-selected at onboarding | View builders, express funding interest, manage watchlist |
| Recruiter | Self-selected at onboarding | Search builders, post opportunities, manage pipeline |
| Admin | Assigned by existing admin | Full platform access, moderation, user management |

### 3.2 Role Change Policy

- Role selected during onboarding (Builder, Investor, or Recruiter)
- **One-time change allowed** — tracked via `role_changed` boolean
- After the change, the role is permanently locked
- Admin role is never self-selectable — set via `is_admin` flag by existing admins
- Prevents gaming (e.g., switching roles to manipulate scores)

### 3.3 Row-Level Security (RLS)

Every table has RLS enabled. Key policies:

| Table | Read | Write | Delete |
|---|---|---|---|
| `profiles` | Public | Own only | None |
| `products` | Public (published) | Own or team maintainer+ | Own only |
| `product_members` | Public (accepted) | Product owner/maintainer | Product owner |
| `builder_events` | Public | **System only** (triggers) | **Never** |
| `builder_scores` | Public | **System only** (functions) | **Never** |
| `notifications` | Own only | **System only** | Own only |
| `updates` | Public | Own only | Own only |

"System only" = inserted via database triggers or `SECURITY DEFINER` functions that bypass RLS.

### 3.4 Route Protection

| Route Pattern | Access Level |
|---|---|
| `/`, `/builders`, `/products`, `/feed`, `/rankings`, `/search`, `/community` | Public |
| `/login`, `/signup` | Public (redirect if authenticated) |
| `/dashboard/*` | Authenticated (role-specific redirect) |
| `/settings/*`, `/products/new`, `/updates/new` | Authenticated |
| `/admin/*` | Authenticated + `is_admin = true` |
| `/api/*` | Varies per endpoint |

### 3.5 Collaborative Product Permissions

| Action | Owner | Maintainer | Contributor |
|---|---|---|---|
| Edit product details | ✅ | ✅ | ❌ |
| Update product stage | ✅ | ✅ | ✅ |
| Post updates | ✅ | ✅ | ✅ |
| Invite members | ✅ | ✅ | ❌ |
| Remove members | ✅ | ✅ (contributors only) | ❌ |
| Change member roles | ✅ | ❌ | ❌ |
| Delete product | ✅ | ❌ | ❌ |
| Transfer ownership | ✅ | ❌ | ❌ |

---

## 4. Data Protection

### 4.1 Encryption

| Layer | Method |
|---|---|
| Data at rest | AES-256 (Supabase PostgreSQL default) |
| Data in transit | TLS 1.2+ (HTTPS enforced on all endpoints) |
| Backups | Encrypted (Supabase managed) |
| Passwords | bcrypt hashed (Supabase Auth) |

### 4.2 Sensitive Data Handling

| Data Type | Storage | Access |
|---|---|---|
| Passwords | bcrypt hashed | Never readable |
| Email addresses | `auth.users` | User + admin only |
| OAuth tokens | Supabase Auth (encrypted) | System only |
| Service role key | Environment variable | Server-side only |
| Anon key | `NEXT_PUBLIC_` env var | Public (safe — RLS enforces access) |

### 4.3 Environment Variables

```
# Public (safe to expose — RLS enforces access control)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Server-only (NEVER expose to client or commit to Git)
SUPABASE_SERVICE_ROLE_KEY=...
```

The service role key bypasses RLS. It is only used in:
- Server-side API route handlers
- Server actions
- `SECURITY DEFINER` database functions

### 4.4 File Upload Security

| Property | Constraint |
|---|---|
| Max file size | 5 MB |
| Allowed types | `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml` |
| Storage | Supabase Storage with bucket-level policies |
| Access | Public read, authenticated write (own files only) |
| Executables | Blocked |

---

## 5. API Security

### 5.1 Input Validation

- All API route handlers validate input before processing
- Enum values enforced at the database level (PostgreSQL enums)
- Text fields sanitized to prevent XSS
- SQL injection prevented by Supabase client (parameterized queries)

### 5.2 Rate Limiting

| Endpoint | Limit | Window |
|---|---|---|
| Login attempts | 5 | 15 minutes |
| Signup | 3 | 1 hour |
| Update creation | 20 | 1 hour |
| Product creation | 5 | 1 hour |
| Follow/unfollow | 30 | 1 hour |
| Feedback submission | 5 | 1 hour |

**Enforcement layers:**
1. Supabase Auth (login/signup)
2. Application (API route handlers)
3. Database (event validation triggers)

### 5.3 CORS & CSRF

| Protection | Implementation |
|---|---|
| CORS | Same-origin only (Next.js default), no wildcard headers |
| CSRF | Built-in Next.js protection for server actions |
| Origin validation | API routes validate the `Origin` header |
| Cookie security | `SameSite=Lax`, `Secure`, `HttpOnly` |

---

## 6. Anti-Abuse & Integrity

### 6.1 Builder Score Integrity

- `builder_events` is append-only — no `UPDATE` or `DELETE` via RLS
- Score calculation runs in `SECURITY DEFINER` functions (not user-callable)
- Score weights are admin-only configurable
- All score changes are auditable via the immutable event stream

### 6.2 Spam Prevention

- Auto-flagging of updates with suspicious patterns (links, keywords)
- Moderation queue for flagged content (admin review)
- Rate limiting on all write operations
- New accounts have a cooldown period before posting

### 6.3 Role Gaming Prevention

- Role changes limited to one time (`role_changed` boolean)
- Admin role cannot be self-assigned
- Builder score only accrues for the builder role

### 6.4 Content Moderation

- Admin moderation queue with severity levels (low, medium, high, critical)
- Actions: approve, reject, delete + ban
- Full audit trail for all moderation decisions

---

## 7. Infrastructure Security

### 7.1 Hosting

| Service | Provider | Security Features |
|---|---|---|
| Frontend | Vercel | Automatic HTTPS, DDoS protection, edge network, isolated preview deployments |
| Database | Supabase | Managed PostgreSQL, automatic backups, encryption at rest, connection pooling |
| Storage | Supabase Storage | S3-compatible, encrypted, bucket-level access policies |

### 7.2 Deployment

- Deployments triggered by Git push (Vercel CI/CD)
- No manual server access required
- Environment variables managed via Vercel dashboard (encrypted at rest)
- Preview deployments for pull requests (isolated from production)

### 7.3 Dependencies

- Pinned to exact versions via `package-lock.json`
- `npm audit` run as part of CI pipeline
- Dependabot or similar recommended for automated security updates

---

## 8. Monitoring & Incident Response

### 8.1 Monitoring

| What | Tool | Purpose |
|---|---|---|
| Application errors | Vercel Analytics | Runtime error tracking |
| Performance | Vercel Speed Insights | Core Web Vitals monitoring |
| Database | Supabase Dashboard | Query performance, connection pool health |
| Auth events | Supabase Auth logs | Login failures, suspicious activity |
| User reports | `/feedback` + `/admin/reports` | User-reported bugs and issues |

### 8.2 Logging

- All builder events logged in `builder_events` (immutable, append-only)
- All moderation actions logged with admin ID and timestamp
- Supabase provides built-in logging for auth, database, and storage
- **No sensitive data** (passwords, tokens, PII) in application logs

### 8.3 Incident Response Plan

| Step | Action |
|---|---|
| 1. Detection | Monitoring alerts, user reports, or admin observation |
| 2. Assessment | Determine severity (low / medium / high / critical) |
| 3. Containment | Disable affected feature, block abusive accounts |
| 4. Resolution | Fix the issue, deploy patch |
| 5. Communication | Notify affected users if data was compromised |
| 6. Post-mortem | Document root cause and prevention measures |

### 8.4 Data Breach Protocol

1. Immediately revoke compromised credentials
2. Rotate service role key and redeploy
3. Notify affected users within 72 hours
4. Report to relevant authorities if required by jurisdiction
5. Document the breach and remediation steps

---

## 9. Compliance

### 9.1 Privacy

- Users can view and edit their own data via `/settings/profile`
- Account deletion removes all personal data (planned for Phase 2)
- No third-party tracking beyond Vercel Analytics (first-party)
- No data sold to third parties

### 9.2 Cookies

| Type | Purpose | Attributes |
|---|---|---|
| Session | Auth session management | HTTP-only, Secure, SameSite=Lax |
| Analytics | Vercel Analytics (first-party) | Privacy-focused, no PII |

No advertising cookies. No third-party cookies.

### 9.3 Future Compliance

| Requirement | Target Phase |
|---|---|
| GDPR (data export, right to deletion) | Phase 2 |
| Privacy policy and terms of service | Before public launch |
| Cookie consent banner | Before public launch |
| SOC 2 | Phase 3 (if enterprise features are built) |

---

## 10. Pre-Launch Checklist

| # | Item | Status |
|---|---|---|
| 1 | All environment variables set in Vercel (not in Git) | ☐ |
| 2 | `.env` files listed in `.gitignore` | ☐ |
| 3 | Service role key used only server-side | ☐ |
| 4 | RLS enabled on all tables | ☐ |
| 5 | RLS policies tested for each role | ☐ |
| 6 | Rate limiting configured on all write endpoints | ☐ |
| 7 | File upload validation (size + MIME type) | ☐ |
| 8 | OAuth callback URL restricted to production domain | ☐ |
| 9 | HTTPS enforced (Vercel default) | ☐ |
| 10 | No sensitive data in client-side code | ☐ |
| 11 | Admin routes protected by `is_admin` check | ☐ |
| 12 | Error pages don't leak stack traces in production | ☐ |
| 13 | `npm audit` shows no critical vulnerabilities | ☐ |
| 14 | Supabase dashboard access restricted to team | ☐ |
| 15 | Database backups enabled | ☐ |

---

<p align="center">
  <sub>Zehunt Security Document v1.0 · April 2026</sub>
</p>

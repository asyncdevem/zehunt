<h1 align="center">Zehunt Design System</h1>
<p align="center"><strong>Hand-Drawn Aesthetic</strong> · Version 1.0</p>

---

## 1. Overview

Zehunt uses a hand-drawn visual language that communicates authenticity, approachability, and builder culture. Every UI element feels intentionally imperfect — wobbly borders, hard shadows, organic shapes, and a limited warm palette.

---

## 2. Technology

| Layer | Tool | Purpose |
|---|---|---|
| Framework | Next.js App Router | Server and client rendering |
| Styling | Tailwind CSS v4 | Utility-first CSS via `app/globals.css` |
| Fonts | `next/font/google` | Kalam + Patrick Hand |
| Icons | `lucide-react` | Consistent icon set, strokeWidth 2.5–2.8 |

---

## 3. Design Tokens

All tokens are defined in `app/globals.css` under `:root` and mapped to Tailwind via `@theme inline`.

### 3.1 Colors

| Token | Value | Usage |
|---|---|---|
| `--background` | `#fdfbf7` | Page background (warm cream) |
| `--foreground` | `#2d2d2d` | Primary text and borders |
| `--muted` | `#e5e0d8` | Secondary backgrounds, disabled states |
| `--accent` | `#ff4d4d` | Primary CTA, highlights, builder role |
| `--border` | `#2d2d2d` | All borders (thick, hand-drawn) |
| `--secondary-accent` | `#2d5da1` | Links, focus states, investor role |
| — | `#e5880a` | Recruiter role, warnings |
| — | `#fff9c4` | Sticky labels, info cards |

### 3.2 Typography

| Element | Font | Weight | Usage |
|---|---|---|---|
| Headings (h1–h6) | Kalam | 700 | All headings, card titles, bold labels |
| Body text | Patrick Hand | 400 | Paragraphs, descriptions, form labels |

Both fonts are loaded via `next/font/google` in `app/layout.tsx` and applied globally through CSS variables.

### 3.3 Border Radius

Hand-drawn borders use irregular multi-value `borderRadius` to create organic, imperfect shapes:

```css
/* Card borders */
borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px'

/* Button/input borders */
borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px'

/* Pill/badge borders */
borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%'

/* Label borders */
borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%'
```

---

## 4. Components

### 4.1 WobblyCard

The primary container component. Used for all content sections.

| Property | Value |
|---|---|
| Border | 3px solid `#2d2d2d` |
| Shadow | `4px 4px 0 0 #2d2d2d` (hard offset, no blur) |
| Padding | `p-5` (20px) |
| Rotation | Optional slight rotation (±1deg) for asymmetry |

```tsx
<WobblyCard className="bg-white" rotate={1}>
  {children}
</WobblyCard>
```

### 4.2 WobblyButton

Two variants for all interactive actions.

| Variant | Default | Hover | Active |
|---|---|---|---|
| Primary | White bg, dark border | Red bg (`#ff4d4d`), white text, translate 2px | Translate 4px (press effect) |
| Secondary | Muted bg (`#e5e0d8`) | Blue bg (`#2d5da1`), white text, translate 2px | Translate 4px |

```tsx
<WobblyButton variant="primary">Save</WobblyButton>
<WobblyButton variant="secondary">Cancel</WobblyButton>
```

### 4.3 StickyLabel

Small uppercase label for section context. Yellow background with dashed border.

```tsx
<StickyLabel>Builder Profile</StickyLabel>
```

### 4.4 RoughPill

Compact badge for metadata, tags, and status indicators.

```tsx
<RoughPill>GROWTH</RoughPill>
<RoughPill>Score 842</RoughPill>
```

### 4.5 Form Inputs

All inputs share the same hand-drawn styling:

| Property | Value |
|---|---|
| Border | 3px solid `#2d2d2d` |
| Focus | Border color changes to `#2d5da1` |
| Placeholder | `#2d2d2d` at 50% opacity |
| Font size | `text-lg` (18px) |
| Padding | `px-4 py-3` |

---

## 5. Visual Language

### 5.1 Shadows
All shadows are hard offset with no blur — simulating a hand-drawn drop shadow.

```css
box-shadow: 4px 4px 0 0 #2d2d2d;
```

### 5.2 Rotation
Cards and sections use slight rotation (±0.5° to ±1°) to break grid rigidity and create a hand-placed feel.

### 5.3 Dashed Borders
Secondary containers and list items use `border-dashed` for visual hierarchy without heaviness.

### 5.4 Paper Texture
The page background uses a subtle radial gradient to simulate paper grain:

```css
background: radial-gradient(circle, transparent 20%, #fdfbf7 20%);
```

---

## 6. Interaction States

| State | Behavior |
|---|---|
| Default | Static position, base colors |
| Hover | `translate(2px, 2px)`, color fill change |
| Active/Press | `translate(4px, 4px)`, simulates physical button press |
| Focus | Border color changes to `#2d5da1` (blue) |
| Disabled | Muted colors, no shadow, no interaction |

---

## 7. Responsive Design

| Breakpoint | Behavior |
|---|---|
| Mobile (default) | Single column, stacked sections |
| Tablet (`md:`) | 2-column grids where appropriate |
| Desktop (`lg:`) | Full multi-column layouts, sidebar navigation |

The hand-drawn aesthetic is preserved across all screen sizes. Touch targets maintain a minimum height of `h-12` (48px).

---

## 8. Accessibility

| Requirement | Implementation |
|---|---|
| Color contrast | High contrast between `#2d2d2d` foreground and `#fdfbf7` background |
| Text size | Large headings (text-4xl+), readable body (text-lg) |
| Touch targets | Minimum h-12 (48px) for all interactive elements |
| Semantic HTML | `<section>`, `<nav>`, `<main>`, `<header>`, heading hierarchy |
| Focus indicators | Visible border color change on focus |
| Screen readers | `aria-label` on icon-only buttons |

---

## 9. Role Colors

Each user role has a distinct accent color used in badges, icons, and dashboard elements:

| Role | Color | Hex |
|---|---|---|
| Builder | Red | `#ff4d4d` |
| Investor | Blue | `#2d5da1` |
| Recruiter | Orange | `#e5880a` |
| Admin | Dark | `#2d2d2d` |

---

## 10. File Reference

| File | Purpose |
|---|---|
| `app/globals.css` | Token definitions, global styles |
| `app/layout.tsx` | Font loading (Kalam, Patrick Hand) |
| `app/components/handdrawn.tsx` | WobblyCard, WobblyButton, StickyLabel, RoughPill |
| `app/components/platform-shell.tsx` | Navigation shell with header |
| `app/components/feedback-button.tsx` | Floating feedback button |

---

<p align="center">
  <sub>Zehunt Design System v1.0 · Hand-drawn aesthetic for builder culture.</sub>
</p>

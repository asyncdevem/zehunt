# Zehunt Hand-Drawn Design System Implementation

This document records how the hand-drawn design system is implemented in the current codebase.

## Tech Stack Context
- Framework: Next.js App Router
- Styling: Tailwind CSS v4 in app/globals.css
- Fonts: next/font/google
- Icons: lucide-react

## Token Source of Truth
Tokens are centralized in app/globals.css under :root:
- --background: #fdfbf7
- --foreground: #2d2d2d
- --muted: #e5e0d8
- --accent: #ff4d4d
- --border: #2d2d2d
- --secondary-accent: #2d5da1
- --wobbly and --wobbly-md radius values

Tailwind v4 theme variables map these tokens to utility usage through @theme inline.

## Typography
Configured in app/layout.tsx with next/font/google:
- Heading font: Kalam (700)
- Body font: Patrick Hand (400)

Applied globally via CSS variables and selectors:
- body uses Patrick Hand
- h1-h6 use Kalam

## Visual Language
Implemented across app/page.tsx:
- Wobbly container borders using irregular multi-value borderRadius
- Thick black borders (2px to 3px)
- Hard offset shadows (no blur)
- Paper grain texture background via radial-gradient
- Slight element rotation for hand-drawn asymmetry
- Dashed borders for secondary emphasis
- Limited color palette matching spec

## Interaction States
Buttons follow the requested behavior:
- Default: white or muted background with 4px hard shadow
- Hover: translate by 2px and color fill
- Active: translate by 4px to simulate pressing

## Responsiveness
- Mobile-first layout with stacked sections
- Multi-column sections activate at larger breakpoints
- Core aesthetic preserved across screen sizes

## Accessibility Notes
- High contrast foreground/background
- Large text sizes in key headings and CTAs
- Touch-friendly button height (h-12)
- Structural sections and semantic headings preserved

## Brand Position Alignment
The homepage narrative is builder-centric and aligns with PRD v2:
- Execution over hype
- Builder score framework
- Event stream as source of truth
- Opportunities as output of reputation

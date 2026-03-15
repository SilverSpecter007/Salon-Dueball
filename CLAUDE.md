# CLAUDE.md — Senior Web Developer Instructions for Salon Dueball

This file defines the standards, conventions, and workflow for AI-assisted development on this project.

---

## Project Overview

**Salon Dueball** is a modern, responsive website for a hair salon. The tech stack targets performance, accessibility, and maintainability.

---

## Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| Framework    | Next.js 14+ (App Router)                     |
| Language     | TypeScript (strict mode)                     |
| Styling      | Tailwind CSS + CSS Modules for component scope |
| UI Library   | shadcn/ui (Radix UI primitives)              |
| Animation    | Framer Motion                                |
| Forms        | React Hook Form + Zod validation             |
| State        | Zustand (client) / React Query (server state)|
| CMS          | Sanity.io or Contentlayer (markdown-based)   |
| Database     | Prisma + PostgreSQL (if backend needed)      |
| Auth         | NextAuth.js v5                               |
| Email        | Resend + React Email                         |
| Testing      | Vitest + Testing Library + Playwright (E2E)  |
| Deployment   | Vercel                                       |
| CI/CD        | GitHub Actions                               |

---

## Code Style & Conventions

### TypeScript
- **Strict mode** is mandatory (`"strict": true` in `tsconfig.json`)
- Prefer `type` over `interface` unless declaration merging is needed
- No `any` — use `unknown` and narrow properly
- Export types explicitly, avoid implicit `any` from third-party types

### React & Next.js
- Use **Server Components by default** — only add `"use client"` when truly needed
- Prefer `async/await` in Server Components over `useEffect` for data fetching
- Use `next/image` for all images (never raw `<img>`)
- Use `next/font` for fonts (no Google Fonts CDN links)
- File-based routing via App Router — no `pages/` directory

### Naming Conventions
- Components: `PascalCase` (`BookingForm.tsx`)
- Hooks: `camelCase` prefixed with `use` (`useAppointments.ts`)
- Utilities: `camelCase` (`formatDate.ts`)
- Constants: `SCREAMING_SNAKE_CASE`
- CSS classes: Tailwind utilities only — no custom class names unless in a `.module.css`

### Folder Structure
```
src/
  app/              # Next.js App Router pages & layouts
    (marketing)/    # Route groups for public pages
    (dashboard)/    # Route groups for admin area
  components/
    ui/             # shadcn/ui base components (do not modify)
    common/         # Shared layout components (Header, Footer)
    features/       # Feature-specific components
  lib/              # Utilities, helpers, constants
  hooks/            # Custom React hooks
  types/            # Global TypeScript types
  styles/           # Global CSS, Tailwind config
  server/           # Server-only code (DB, auth, email)
```

---

## UI & Accessibility

- All interactive elements must be **keyboard navigable**
- Maintain **WCAG 2.1 AA** contrast ratios minimum
- Use semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- Always provide `alt` text for images; decorative images use `alt=""`
- Use `aria-label` / `aria-describedby` where semantic HTML falls short
- Respect `prefers-reduced-motion` for all animations

### Responsive Design
- Mobile-first approach with Tailwind breakpoints: `sm` → `md` → `lg` → `xl`
- Test at 375px, 768px, 1024px, 1440px minimum
- No horizontal scroll on any viewport

---

## Performance

- **Core Web Vitals** targets: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lazy-load images below the fold with `loading="lazy"`
- Use `next/dynamic` for heavy client components
- Avoid large client-side bundles — prefer RSC
- Use `React.cache()` and Next.js `unstable_cache` for data deduplication
- Inline critical CSS; defer non-critical stylesheets

---

## SEO

- Every page must have a `generateMetadata()` export in Next.js
- Use structured data (JSON-LD) for LocalBusiness schema
- Sitemap via `next-sitemap` or built-in `sitemap.ts`
- `robots.txt` must be configured correctly for production
- All URLs lowercase, hyphen-separated

---

## Forms & Validation

- All forms use **React Hook Form**
- Validation schemas defined with **Zod** — shared between client and server
- Server Actions for form submissions — never expose API keys to client
- Show inline field errors on blur, not only on submit
- Disable submit button while submitting to prevent double-submit

---

## Security

- Sanitize all user inputs on the server
- Use `Content-Security-Policy` headers
- Never commit secrets — use `.env.local` and Vercel environment variables
- Rate-limit API routes and Server Actions using `upstash/ratelimit`
- CSRF protection is handled by Next.js Server Actions natively
- Dependency audit: run `pnpm audit` before every release

---

## Testing

### Unit & Integration (Vitest + Testing Library)
- Test every utility function
- Test form validation logic
- Test critical UI components (booking form, contact form)
- Aim for > 80% coverage on `src/lib/` and `src/server/`

### E2E (Playwright)
- Cover the full booking flow
- Cover the contact form submission
- Run against staging environment before every deploy

### Commands
```bash
pnpm test          # Run unit tests
pnpm test:watch    # Watch mode
pnpm test:e2e      # Run Playwright E2E tests
pnpm test:coverage # Coverage report
```

---

## Git Workflow

- Branch naming: `feat/`, `fix/`, `chore/`, `docs/` prefixes
- Commits follow **Conventional Commits**: `feat: add online booking form`
- No direct pushes to `main` — all changes via Pull Request
- PR must pass CI (lint, typecheck, tests) before merge
- Squash merge PRs to keep `main` history clean

### Commit Message Format
```
<type>(<scope>): <short description>

[optional body]

[optional footer: BREAKING CHANGE or issue refs]
```

---

## Development Commands

```bash
pnpm dev           # Start dev server (http://localhost:3000)
pnpm build         # Production build
pnpm start         # Start production server
pnpm lint          # ESLint check
pnpm lint:fix      # Auto-fix lint issues
pnpm typecheck     # TypeScript check (tsc --noEmit)
pnpm format        # Prettier format all files
pnpm db:push       # Push Prisma schema to DB
pnpm db:studio     # Open Prisma Studio
```

---

## CI/CD Pipeline (GitHub Actions)

Every Pull Request runs:
1. `pnpm lint` — ESLint
2. `pnpm typecheck` — TypeScript
3. `pnpm test` — Unit tests
4. `pnpm build` — Next.js build check

Every merge to `main` triggers:
1. All checks above
2. `pnpm test:e2e` — Playwright on staging
3. Vercel deployment to production

---

## Environment Variables

```bash
# .env.local (never commit)
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
RESEND_API_KEY=
SANITY_PROJECT_ID=
SANITY_DATASET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## Do's and Don'ts

### Do
- Write self-documenting code — names should explain intent
- Keep components small and single-purpose
- Co-locate tests next to the files they test
- Use `loading.tsx` and `error.tsx` for every route segment
- Handle all error states in the UI explicitly

### Don't
- Don't use `useEffect` for data fetching when a Server Component works
- Don't import server-only modules in client components
- Don't hardcode colors or spacing — use Tailwind tokens
- Don't skip TypeScript errors with `@ts-ignore` — fix the root cause
- Don't install a library for something achievable in < 10 lines of native code

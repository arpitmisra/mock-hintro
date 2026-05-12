# Hintro Dashboard

Frontend assignment for Hintro — a responsive dashboard UI built with Next.js, TypeScript, and Tailwind CSS.

The app fetches real data from the Hintro mock API and renders a dashboard with call stats, recent call history, and user profile info. It handles both empty and active user states gracefully.

## Setup

```bash
# clone and install
git clone <repo-url>
cd hintro-dashboard
npm install

# create env file
cp .env.example .env.local

# start dev server
npm run dev
```

The app runs at `http://localhost:3000` and redirects to `/dashboard`.

The `.env.example` already has the correct API URL (`https://mock-backend-hintro.vercel.app`), so you just need to copy it over.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- TanStack Query for data fetching
- Axios for HTTP
- date-fns for date formatting
- Lucide icons

## Project Structure

```
src/
  app/
    dashboard/        # main dashboard page
    layout.tsx        # root layout, fonts, providers
    page.tsx          # redirects to /dashboard
    loading.tsx       # loading spinner
    error.tsx         # error boundary
  components/
    dashboard/        # stat cards, recent calls, empty state
    layout/           # sidebar, navbar, user menu, logout modal
    ui/               # shadcn primitives
    providers.tsx     # react-query provider
    user-switcher.tsx # dev toggle for switching users
  hooks/
    use-user-id.ts    # persists selected user in localStorage
  services/
    api.ts            # axios instance with x-user-id header
    dashboard.service.ts
  types/
    index.ts          # TS interfaces for API responses
  utils/
    format.ts         # duration, time, initials helpers
```

## API

All dashboard data comes from the mock server. Nothing is hardcoded.

The app uses these endpoints:

- `GET /api/auth/profile` — user info (name, email)
- `GET /api/call-sessions/stats` — stats for the 4 cards
- `GET /api/call-sessions?limit=10` — recent call history

Every request includes an `x-user-id` header (`u1` or `u2`) which determines what data comes back:

- **u1** — new user, everything is empty/zero
- **u2** — active user with stats and call history

## User Switcher

There's a small toggle button in the bottom-right corner of the page. Click it to switch between `u1` (empty state) and `u2` (with data). The selection is saved in localStorage so it persists across refreshes.

This is purely a dev/demo tool — in a real app you'd have proper auth.

## What's Implemented

- Desktop sidebar with active state highlighting
- Top navbar with profile avatar and "Watch Tutorial" button
- 4 stat cards (Total Sessions, Average Duration, AI Used, Last Session)
- Recent calls grouped by date with colored avatars
- Empty state with a CTA when there are no calls
- Profile dropdown with name/email and logout option
- Logout confirmation modal
- Mobile responsive layout (hamburger menu, slide-over sidebar, 2x2 card grid)
- Loading skeletons while data is being fetched
- Error boundary with retry

## Responsive Behavior

- **Desktop (1024px+):** Fixed sidebar on the left, 4-column stat cards
- **Tablet/Mobile (<1024px):** Sidebar hidden behind hamburger menu, stat cards go to a 2x2 grid, everything stacks vertically

## Assumptions and Tradeoffs

- Only the Dashboard route is functional. Other sidebar links (Call Insights, Knowledge Base, etc.) are just UI — they don't navigate anywhere since they're outside the assignment scope.
- Avatar colors on call items are generated from the session ID hash. The API doesn't return color info so this felt like a reasonable approach.
- The logout button just closes the modal. There's no actual auth system to log out from, so it didn't make sense to redirect anywhere.
- TanStack Query's stale time is set to 30 seconds. Seemed like a good balance for a demo app — data stays fresh enough without hammering the API on every tab focus.
- The `x-user-id` header is set via an axios request interceptor that reads from localStorage. Simple and works for this use case.

## Deployment

Push to GitHub and import into Vercel. Set the environment variable:

```
NEXT_PUBLIC_API_BASE_URL=https://mock-backend-hintro.vercel.app
```

Everything else uses Vercel's default Next.js settings — no special config needed.

## Build

```bash
npm run build   # production build
npm start       # serve production build locally
npm run lint    # run eslint
```

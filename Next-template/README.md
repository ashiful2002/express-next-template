# Next.js Frontend Template

A production-ready Next.js 16 (App Router) starter powered by React 19, Tailwind CSS v4, shadcn / Base UI, and integrated directly with the Express 5 backend.

---

## Features

- **Next.js 16 & React 19**: Modern App Router architecture.
- **Tailwind CSS v4 & Base UI**: Styled with shadcn UI components (`Button`, `Input`, `Label`, `Card`).
- **Standardized Path Aliases**: `@/*` mapped directly to `src/*` (`@/components`, `@/lib`, `@/hooks`, `@/types`, `@/context`).
- **Static Assets Ready**: Correctly located in root `/public` directory.
- **Global Auth Context**: Real-time authentication state management via `useAuth()` hook.
- **Pre-configured API Client**: Typed `fetch` wrapper in `src/lib/api-client.ts` with automatic cookie credentials for HTTP-only authentication tokens (`accessToken`, `better-auth.session_token`).
- **Starter Auth Pages**: Ready-to-use `/login` and `/register` pages with form validation and Google OAuth redirection.

---

## Getting Started

### 1. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Default variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5001
```

### 2. Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx      # Sign In page
│   │   └── sign-up/page.tsx   # Sign Up page
│   ├── globals.css             # Tailwind v4 styles & theme tokens
│   ├── layout.tsx              # RootLayout with ThemeProvider & AuthProvider
│   └── page.tsx                # Home page with auth status preview
├── components/
│   ├── theme-provider.tsx      # Dark/light theme provider
│   └── ui/                     # Shadcn / Base UI primitives (Button, Input, Card, Label)
├── context/
│   └── auth-context.tsx        # Global auth context & session sync
├── hooks/
│   └── use-auth.ts             # useAuth hook
├── lib/
│   ├── api-client.ts           # Reusable fetch client with cookie handling
│   ├── auth-api.ts             # Typed auth endpoints caller
│   └── utils.ts                # cn utility
├── types/
│   └── index.ts                # Shared TypeScript models and API types
public/                         # Root static files (images, icons)
```

---

## Authentication Usage

Inside any client component:

```tsx
'use client';

import { useAuth } from '@/hooks/use-auth';

export default function ProfileWidget() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Please sign in</p>;

  return (
    <div>
      <p>Welcome, {user?.name} ({user?.role})</p>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
}
```

---

## Adding More Shadcn Components

To add additional components:

```bash
npx shadcn@latest add dialog
```

Components will automatically install to `src/components/ui/` with `@/` aliases.

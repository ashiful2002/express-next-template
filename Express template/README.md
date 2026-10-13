# Trade Slot - Backend API Server

A high-performance, modular Node.js & Express backend API built with TypeScript, Prisma 7, PostgreSQL (Neon DB), Better Auth, and JWT.

---

##  Key Features & Architecture

- **Modular Prisma 7 Setup**: Multi-schema organization splitting schemas into core, auth, and enum definitions (`schema.prisma`, `auth.prisma`, `enums.prisma`).
- **Hybrid Authentication**: Dual authentication architecture integrating **Better Auth** (session management) and **JWT** (access & refresh token flow).
- **Role-Based Access Control (RBAC)**: Enforced authorization for `SUPER_ADMIN`, `ADMIN`, `TRADER`, and `CUSTOMER`.
- **Type-Safe Request Context**: Augmented Express `Request` interface (`req.user`) for clean controller access.
- **Strict Environment Validation**: Startup validation for required environment variables using custom runtime helpers.
- **Scalable Modular Structure**: Clean separation of concerns (Routes -> Controllers -> Services -> Shared Utilities -> Middleware).
- **Integrations Ready**: Cloudinary media upload, Stripe payments & webhooks, and Nodemailer email triggers.

---

## Tech Stack

- **Runtime & Framework**: Node.js, Express 5, TypeScript
- **Database & ORM**: PostgreSQL (Neon DB), Prisma 7 (`@prisma/adapter-pg`)
- **Authentication**: Better Auth, JWT (`jsonwebtoken`), Bcrypt
- **Validation & Helpers**: Zod, `http-status`, `ms`
- **File & Payment Services**: Cloudinary, Multer, Stripe

---

## Directory Overview

```text
src/
├── app/
│   ├── config/          # Dotenv & strict env variable validation
│   ├── errorHelpers/    # AppError & error formatting handlers
│   ├── interfaces/      # Type definitions & Express Request augmentation
│   ├── lib/             # Prisma client & Better Auth instances
│   ├── middlewares/     # Auth & global error middleware
│   ├── modules/         # Feature modules (Auth, User, etc.)
│   ├── routes/          # Central API router aggregator
│   ├── shared/          # Shared utilities (catchAsync, sendResponse)
│   └── utils/           # JWT, cookies, and token generators
├── app.ts               # Express application initialization
└── server.ts            # HTTP server entrypoint
```

---

## API Routes Summary

### Base URL: `/api/v1`

#### Auth Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/sign-up` | Register a new user | No |
| `POST` | `/auth/login` | Authenticate user & issue tokens | No |
| `GET` | `/auth/me` | Fetch authenticated user data | Yes (Any role) |
| `POST` | `/auth/refresh-token` | Issue new access token | No (Cookie-based) |
| `POST` | `/auth/change-password` | Update account password | Yes (Any role) |
| `POST` | `/auth/logout` | Clear session & tokens | Yes (Any role) |
| `POST` | `/auth/verify-email` | Verify email with OTP | No |
| `POST` | `/auth/forgot-password` | Request password reset OTP | No |
| `POST` | `/auth/reset-password` | Reset password using OTP | No |
| `GET` | `/auth/login/google` | Google OAuth sign-in | No |
| `GET` | `/auth/google/success` | OAuth success redirect handler | No |
| `GET` | `/auth/google/error` | OAuth failure redirect handler | No |

#### User Routes (`/users`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/users/me` | Fetch current user profile | Yes (Any role) |
| `PATCH` | `/users/me` | Update current user profile (`name`, `image`) | Yes (Any role) |
| `GET` | `/users` | List users (supports `searchTerm`, `role`, `status`, pagination) | Yes (`ADMIN`, `SUPER_ADMIN`) |
| `GET` | `/users/:id` | Get user details by ID | Yes (`ADMIN`, `SUPER_ADMIN`) |
| `PATCH` | `/users/:id` | Update user role, status, or details | Yes (`ADMIN`, `SUPER_ADMIN`) |
| `DELETE` | `/users/:id` | Soft delete user | Yes (`ADMIN`, `SUPER_ADMIN`) |

---


##  Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma Client
pnpm generate

# 3. Apply DB Migrations
pnpm migrate

# 4. Run Development Server
pnpm dev

# 5. Build for Production
pnpm build
```

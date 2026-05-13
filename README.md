# CargoLedger UI

CargoLedger UI is a Next.js dashboard for logistics, shipment tracking, branch operations, users, reports, and settings. The app uses the App Router, TypeScript, Tailwind CSS, shadcn-style UI components, and a centralized Axios client for backend requests.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Axios
- React Hook Form and Zod
- Recharts
- Lucide React
- Sonner toasts

## Getting Started

Install dependencies:

```bash
npm install
```

Create or update `.env` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

All backend requests use the centralized API client in `lib/api.ts`.

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL for API requests from the browser | `http://localhost:5000/api` |

Endpoint paths are defined in `lib/api-endpoints.ts` and should stay relative, for example `/auth/login` or `/shipments`. The API client combines those paths with `NEXT_PUBLIC_API_URL`.

Restart the Next.js dev server after changing `.env`; `NEXT_PUBLIC_*` values are loaded into the browser bundle when the server starts.

## Available Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build the production app
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Project Structure

```text
cargoledger-ui/
|-- app/
|   |-- layout.tsx                 # Root layout, metadata, auth provider
|   |-- page.tsx                   # Public landing/home page
|   |-- globals.css                # App-level global styles
|   |-- login/
|   |   `-- page.tsx               # Login screen
|   `-- dashboard/
|       |-- layout.tsx             # Dashboard shell wrapper
|       |-- page.tsx               # Role-based dashboard entry
|       |-- branches/page.tsx      # Branch management
|       |-- reports/page.tsx       # Reports page
|       |-- settings/page.tsx      # Settings page
|       |-- shipments/page.tsx     # Shipment management
|       |-- tracking/page.tsx      # Tracking lookup
|       `-- users/page.tsx         # User management
|-- components/
|   |-- dashboards/                # Role-specific dashboard views
|   |-- layout/                    # Header, sidebar, dashboard layout
|   |-- shared/                    # Shared feature components
|   |-- shipment/                  # Shipment tables and tracking timeline
|   |-- theme-provider.tsx         # Theme provider
|   `-- ui/                        # Reusable UI primitives
|-- context/
|   `-- auth-context.tsx           # Authentication state and actions
|-- hooks/
|   |-- useAuth.ts                 # Auth context hook
|   |-- useRole.ts                 # Role helpers
|   |-- use-mobile.ts              # Responsive utility hook
|   `-- use-toast.ts               # Toast hook
|-- lib/
|   |-- api.ts                     # Axios client using NEXT_PUBLIC_API_URL
|   |-- api-endpoints.ts           # Central endpoint definitions
|   |-- colors.ts                  # Color constants
|   |-- typography.ts              # Typography constants
|   |-- types.ts                   # Shared TypeScript types
|   `-- utils.ts                   # Utility helpers
|-- public/                        # Static assets and icons
|-- styles/
|   `-- globals.css                # Additional global styles
|-- components.json                # shadcn/ui configuration
|-- eslint.config.mjs              # ESLint configuration
|-- next.config.mjs                # Next.js configuration
|-- package.json                   # Scripts and dependencies
|-- postcss.config.mjs             # PostCSS configuration
`-- tsconfig.json                  # TypeScript configuration and aliases
```

## API Usage

Use `apiClient` and `API_ENDPOINTS` for requests:

```ts
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/api-endpoints';

const response = await apiClient.get(API_ENDPOINTS.SHIPMENTS.LIST);
```

The API client:

- Reads `NEXT_PUBLIC_API_URL` from `.env`
- Adds `Content-Type: application/json`
- Adds the stored bearer token when available
- Clears auth and redirects to `/login` on `401` responses
- Returns a consistent `ApiResponse<T>` shape

## Main Features

- Authenticated dashboard shell with sidebar navigation
- Role-based dashboard views for super admin, branch manager, employee, and customer
- Shipment management and tracking timeline UI
- Branch, user, reports, and settings pages
- Shared status badges, stats cards, tables, forms, dialogs, and layout primitives
- Responsive UI built with Tailwind CSS and Radix components

## Development Notes

- Keep API paths in `lib/api-endpoints.ts`.
- Keep request logic in `lib/api.ts` or small feature services that call `apiClient`.
- Use the `@/*` path alias for root-relative imports.
- Add reusable base components under `components/ui`.
- Add business-facing components under the matching feature folder in `components/`.

## Production Build

```bash
npm run build
npm run start
```

For deployment, set `NEXT_PUBLIC_API_URL` to the production backend API URL before building.

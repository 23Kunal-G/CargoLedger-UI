# CargoLedger UI

A modern, responsive logistics and shipment tracking dashboard built with Next.js, React, and TypeScript. CargoLedger provides comprehensive tracking, analytics, and management tools for cargo and shipment operations.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Key Features](#key-features)
- [Component Architecture](#component-architecture)

## 🛠 Tech Stack

- **Framework:** Next.js 14.2.35
- **Language:** TypeScript 5.0+
- **UI Framework:** React 18.2+
- **Styling:** Tailwind CSS 3.3+
- **Component Library:** Radix UI
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod validation
- **Charts & Visualization:** Recharts
- **Icons:** Lucide React + Radix UI Icons
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Date Handling:** date-fns
- **Utilities:** class-variance-authority, clsx, tailwind-merge

## 📁 Project Structure

```
cargoledger-ui/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── src/                          # Source code directory
│   ├── components/              # React components
│   │   ├── common/              # Shared utility components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── stats-card.tsx           # Statistics card display
│   │   │   ├── chart-container.tsx      # Chart wrapper component
│   │   │   ├── recent-shipments.tsx     # Recent shipments list
│   │   │   └── branch-performance.tsx   # Branch performance metrics
│   │   ├── forms/               # Form components (shipment forms, etc.)
│   │   │   └── shipment-form.tsx        # Shipment creation/edit form
│   │   ├── layout/              # Layout components
│   │   │   ├── app-sidebar.tsx          # Main navigation sidebar
│   │   │   ├── app-header.tsx           # Application header
│   │   │   └── page-layout.tsx          # Main page layout wrapper
│   │   ├── modals/              # Modal/dialog components
│   │   ├── shipment/            # Shipment-related components
│   │   │   └── tracking-timeline.tsx    # Shipment tracking timeline
│   │   ├── tables/              # Data table components
│   │   ├── ui/                  # Base UI components (Radix UI based)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── ... (other UI components)
│   │   ├── icons.tsx            # Custom icon library
│   │   └── theme-provider.tsx   # Theme configuration provider
│   │
│   ├── pages/                   # Page components (Next.js Pages Router)
│   │   └── super-admin/         # Super admin section
│   │       └── dashboard.tsx    # Super admin dashboard
│   │
│   ├── store/                   # Zustand state management
│   │   └── user-store.ts        # User authentication & profile state
│   │
│   ├── services/                # API service layer (empty - ready for API calls)
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── user.ts              # User-related types
│   │   └── shipment.ts          # Shipment-related types
│   │
│   ├── lib/                     # Utility functions
│   │   └── utils.ts             # General utility functions
│   │
│   ├── hooks/                   # Custom React hooks (empty - ready for custom hooks)
│   │
│   ├── data/                    # Static data/constants
│   │
│   ├── styles/                  # Additional stylesheets
│   │
│   └── utils/                   # Utility functions
│
├── public/                       # Static assets
│   └── assets/
│       ├── icons/              # Icon assets
│       └── images/             # Image assets
│
├── .next/                        # Build output (auto-generated)
├── node_modules/                # Dependencies (auto-generated)
│
├── Configuration Files
│   ├── next.config.mjs          # Next.js configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── components.json          # shadcn/ui component config
│   ├── eslint.config.mjs        # ESLint configuration
│   └── package.json             # Project dependencies
│
└── Documentation
    ├── README.md                # This file
    ├── CLAUDE.md                # Claude AI assistant guidelines
    └── AGENTS.md                # Agent workflows (if applicable)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables (if needed)
# Create a .env.local file in the project root
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The development server supports hot module replacement - changes are reflected instantly.

## 🔄 Development Workflow

### Component Development Workflow

1. **Define Types** (`src/types/`)
   - Create TypeScript interfaces and types for your data structures
   - Example: Define `Shipment`, `User`, `Branch` types

2. **Create Components** (`src/components/`)
   - Build reusable components following the folder structure
   - Keep components focused and single-responsibility
   - Use composition over inheritance

3. **Add Custom Hooks** (`src/hooks/`)
   - Extract component logic into custom hooks
   - Example: `useShipmentTracking()`, `useBranchData()`

4. **State Management** (`src/store/`)
   - Use Zustand for global state
   - Keep stores focused on specific domains
   - Example: `user-store.ts` manages auth state

5. **API Integration** (`src/services/`)
   - Create service functions for API calls
   - Use axios for HTTP requests
   - Implement error handling and retry logic

6. **Page Assembly** (`src/pages/`)
   - Compose pages using components
   - Implement page-specific logic
   - Connect to store and services

### File Naming Conventions

- **Components:** PascalCase with `.tsx` extension
  - `ShipmentForm.tsx`, `DashboardCard.tsx`
- **Types:** `kebab-case.ts` in `src/types/`
  - `shipment.ts`, `user.ts`
- **Stores:** `kebab-case.ts` in `src/store/`
  - `user-store.ts`, `dashboard-store.ts`
- **Hooks:** `use-kebab-case.ts` in `src/hooks/`
  - `use-shipment-tracking.ts`, `use-auth.ts`
- **Services:** `kebab-case.ts` in `src/services/`
  - `shipment-api.ts`, `user-api.ts`

### Data Flow Architecture

```
User Interaction
        ↓
Component (UI)
        ↓
Custom Hook (Logic)
        ↓
Zustand Store (State Management)
        ↓
API Services (HTTP Calls)
        ↓
Backend API
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## ✨ Key Features

### Dashboard
- **Statistics Overview:** Display key metrics (branches, shipments, deliveries, blockchain records)
- **Charts & Analytics:** Visual representation of shipment and branch performance data
- **Recent Shipments:** Quick view of latest shipment activities
- **Branch Performance:** Monitor performance across all branches

### Shipment Management
- **Tracking Timeline:** Visual tracking of shipment progress through various stages
- **Shipment Forms:** Create and manage shipment records
- **Status Updates:** Real-time status tracking

### User Experience
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support:** Theme switching capability
- **Smooth Animations:** Framer Motion for fluid transitions
- **Toast Notifications:** User feedback via React Hot Toast
- **Form Validation:** Zod schema validation with React Hook Form

## 🧩 Component Architecture

### Component Categories

#### 1. **UI Components** (`src/components/ui/`)
Base reusable components from Radix UI and Tailwind CSS.
- Button, Card, Avatar, Badge, Select, etc.
- Used as building blocks for feature components

#### 2. **Layout Components** (`src/components/layout/`)
Page structure and navigation components.
- `AppSidebar`: Main navigation
- `AppHeader`: Top navigation bar
- `PageLayout`: Main page wrapper with sidebar and header

#### 3. **Feature Components** (`src/components/dashboard/`, `src/components/shipment/`)
Business logic and feature-specific components.
- `StatsCard`: Displays individual statistics
- `ChartContainer`: Wraps chart visualizations
- `TrackingTimeline`: Shipment tracking visualization
- `RecentShipments`: List of recent shipment activities

#### 4. **Form Components** (`src/components/forms/`)
Form handling and validation.
- `ShipmentForm`: Create/edit shipment records
- Uses React Hook Form + Zod for validation

#### 5. **Common Components** (`src/components/common/`)
Shared utility components used across the app.

### Component Best Practices

✅ **Do:**
- Keep components small and focused
- Use TypeScript for type safety
- Implement prop validation
- Use custom hooks to extract logic
- Keep CSS classes manageable with clsx/tailwind-merge

❌ **Avoid:**
- Large monolithic components
- Prop drilling (use context or state management instead)
- Inline styles (use Tailwind CSS)
- Mixing business logic with UI logic

## 🎨 Styling

The project uses **Tailwind CSS** with the following customizations:

- Custom color scheme with `cargo-primary` color
- Responsive design system with breakpoints (sm, md, lg, xl, 2xl)
- Animations from `tailwindcss-animate`
- Component variants using `class-variance-authority`

### Tailwind Configuration
See `tailwind.config.js` for custom theme extensions and plugins.

## 🔗 Path Aliases

TypeScript path aliases for cleaner imports:

```typescript
// Instead of:
import { ShipmentForm } from '../../components/forms/shipment-form';

// Use:
import { ShipmentForm } from '@/components/forms/shipment-form';
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

## 📦 State Management with Zustand

Simple, lightweight state management using Zustand.

Example store structure (`src/store/user-store.ts`):
```typescript
import { create } from 'zustand';

interface UserState {
  user: User | null;
  fetchUserProfile: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUserProfile: async () => {
    // Fetch user data from API
  },
  logout: () => set({ user: null }),
}));
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

The build process:
1. Compiles TypeScript
2. Bundles and optimizes code
3. Generates static assets
4. Creates `.next` directory with production build

### Deployment Options

- **Vercel** (Recommended for Next.js): Automatic deployments from git
- **Docker:** Containerize the application
- **Traditional Servers:** Use `npm start` with a process manager like PM2

## 📝 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=CargoLedger
```

Use `NEXT_PUBLIC_` prefix to expose variables to the browser.

## 🔧 Troubleshooting

### Build Failures
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript: `npm run build`

### Module Not Found Errors
- Verify path aliases in `tsconfig.json`
- Check file names match imports exactly
- Ensure `baseUrl` is set in `tsconfig.json`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 📄 License

This project is part of the CargoLedger system. All rights reserved.

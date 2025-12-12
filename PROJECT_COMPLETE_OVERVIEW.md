# RFB Inventory & Production System - Complete Project Overview

## 📋 Project Summary
**RFB Inventory & Production System** is a Next.js 14 web application for managing inventory, production, recipes, purchases, and reporting for a food and bakery business.

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js**: 14.0.4 (App Router)
- **React**: 18.2.0
- **TypeScript**: 5.3.3
- **Node.js**: 18.x

### Database & ORM
- **Prisma**: 5.7.1
- **PostgreSQL** (Production - Railway)
- **SQLite** (Local Development)

### Authentication
- **NextAuth.js**: 4.24.5
- **bcryptjs**: 2.4.3

### UI Components
- **Radix UI**: Dialog, Dropdown, Select, Toast
- **Lucide React**: Icons
- **Tailwind CSS**: 3.4.0
- **React Hook Form**: 7.49.2
- **Zod**: 3.22.4 (Validation)

### PDF Generation
- **PDFKit**: 0.17.2
- **jsPDF**: 2.5.1
- **jsPDF-AutoTable**: 3.8.2

### State Management
- **TanStack React Query**: 5.17.0

### Deployment
- **Railway**: Primary deployment platform
- **Nixpacks**: Build system
- **Docker**: Alternative build option

---

## 📁 Project Structure

```
RFB-Inventory-1/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/[...nextauth]/  # NextAuth authentication
│   │   ├── items/                # Inventory items CRUD
│   │   ├── production/           # Production records
│   │   ├── purchases/           # Purchase records
│   │   ├── recipes/              # Recipe management
│   │   ├── suppliers/           # Supplier management
│   │   ├── units/                # Unit conversion
│   │   ├── users/                # User management
│   │   ├── pdf/generate/        # PDF generation endpoint
│   │   ├── dashboard/stats/      # Dashboard statistics
│   │   ├── backup/               # Backup/restore
│   │   └── trash/                # Soft delete management
│   │
│   ├── dashboard/                # Dashboard page
│   ├── items/                    # Inventory items pages
│   │   ├── raw-material/         # Raw materials
│   │   └── essence/              # Essence items
│   ├── production/               # Production pages
│   ├── purchases/                # Purchase pages
│   ├── recipes/                  # Recipe pages
│   ├── reports/                  # Report pages
│   │   ├── stock/                # Stock report
│   │   └── production-cost/      # Production cost report
│   ├── settings/                 # Settings pages
│   │   ├── users/                # User management
│   │   ├── access/                # Access control
│   │   ├── backup/               # Backup settings
│   │   └── reset/                # Reset database
│   ├── trash/                    # Trash/restore page
│   ├── login/                    # Login page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (redirects)
│   └── providers.tsx             # React Query provider
│
├── components/                   # React Components
│   ├── DashboardLayout.tsx       # Main layout wrapper
│   ├── PrintButton.tsx           # PDF export button
│   ├── InstallPWA.tsx           # PWA install prompt
│   └── FullscreenToggle.tsx     # Fullscreen toggle
│
├── lib/                          # Utility Libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client singleton
│   ├── pdf.ts                    # PDF generation logic
│   ├── units.ts                  # Unit conversion utilities
│   ├── utils.ts                  # General utilities
│   └── offline.ts                # Offline/PWA support
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding
│   └── migrations/               # Migration files
│
├── public/                        # Static Assets
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service Worker
│
├── scripts/                       # Build/Deploy Scripts
│   ├── railway-build.sh          # Railway build script
│   ├── railway-start.sh          # Railway start script
│   ├── nixpacks-build.sh         # Nixpacks build script
│   └── switch-to-sqlite.js       # Local dev database switcher
│
├── middleware.ts                 # Next.js middleware (auth)
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind CSS config
├── railway.json                  # Railway deployment config
├── nixpacks.toml                 # Nixpacks build config
├── Dockerfile                    # Docker build config
└── vercel.json                   # Vercel config (disabled)
```

---

## 🔑 Key Features

### 1. Inventory Management
- Raw Materials management
- Essence items management
- Unit conversion system
- Stock tracking
- Reorder threshold alerts

### 2. Production Management
- Production records
- Recipe-based production
- Cost calculation (ingredients + labor + overhead)
- Daily/Monthly totals
- PDF export with summaries

### 3. Recipe Management
- Recipe creation and editing
- Ingredient management
- Recipe scaling
- Cost per unit calculation

### 4. Purchase Management
- Purchase records
- Supplier management
- Purchase history
- Date range filtering

### 5. Reporting
- Stock reports
- Production cost reports
- Daily/Monthly totals
- PDF export functionality

### 6. User Management
- Multi-user support
- Role-based access control
- Password management
- User settings

### 7. Backup & Restore
- Database backup
- Database restore
- Data export/import

### 8. PWA Support
- Offline functionality
- Service Worker
- Install prompt
- App-like experience

---

## 📊 Database Schema (Prisma)

### Main Models:
- **User**: Authentication and user management
- **Unit**: Measurement units
- **ConversionFactor**: Unit conversions
- **Item**: Inventory items (raw materials, essence)
- **Supplier**: Supplier information
- **Purchase**: Purchase records
- **PurchaseItem**: Purchase line items
- **Recipe**: Recipe definitions
- **RecipeIngredient**: Recipe ingredients
- **Production**: Production records
- **ShopSettings**: Application settings

---

## 🔐 Authentication

- **Provider**: NextAuth.js Credentials Provider
- **Default User**: admin@rfb.com / admin123
- **Password Hashing**: bcryptjs
- **Session**: JWT-based
- **Middleware**: Protected routes

---

## 📄 PDF Generation

- **Library**: PDFKit (server-side)
- **Features**:
  - Table generation
  - Daily/Monthly totals
  - Grand totals
  - Custom headers/footers
  - Multi-page support

---

## 🚀 Deployment Configuration

### Railway (Primary)
- **Builder**: RAILPACK
- **Runtime**: V2
- **Database**: PostgreSQL (auto-provisioned)
- **Environment Variables**:
  - `DATABASE_URL`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`

### Build Process
1. Install dependencies
2. Generate Prisma Client
3. Build Next.js application
4. Run migrations on start
5. Seed database (if needed)

---

## 📝 Important Files

### Configuration Files
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `next.config.js`: Next.js configuration
- `railway.json`: Railway deployment config
- `nixpacks.toml`: Nixpacks build config
- `prisma/schema.prisma`: Database schema

### Key Components
- `components/PrintButton.tsx`: PDF export functionality
- `components/DashboardLayout.tsx`: Main layout
- `lib/pdf.ts`: PDF generation logic
- `lib/auth.ts`: Authentication setup
- `middleware.ts`: Route protection

### API Routes
- `/api/auth/[...nextauth]`: Authentication
- `/api/items`: Inventory CRUD
- `/api/production`: Production records
- `/api/purchases`: Purchase records
- `/api/recipes`: Recipe management
- `/api/pdf/generate`: PDF generation

---

## 🧪 Development

### Local Setup
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

### Port
- Development: `http://localhost:3002`

### Database
- Local: SQLite (`prisma/dev.db`)
- Production: PostgreSQL (Railway)

---

## 📦 Scripts

- `npm run dev`: Start development server (port 3002)
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run prisma:generate`: Generate Prisma Client
- `npm run prisma:migrate`: Run migrations
- `npm run prisma:seed`: Seed database
- `npm run prisma:studio`: Open Prisma Studio

---

## 🔧 Recent Changes

1. **PrintButton Refactor**: Simplified PDF actions into single `handlePDFAction` function
2. **PDF Options**: Wrapped `dailyTotals`, `monthlyTotals`, `grandTotal` in `extra` object
3. **Railway Deployment**: Configured with RAILPACK builder and Runtime V2
4. **Dockerfile**: Removed cache mount for compatibility
5. **Build Scripts**: Error-proof build and start scripts

---

## 📌 Current Status

- ✅ Local development: Working
- ✅ Database: SQLite (local), PostgreSQL (production)
- ✅ Authentication: NextAuth.js configured
- ✅ PDF Export: Functional
- ⏳ Railway Deployment: In progress

---

## 🎯 Project Purpose

This is a complete inventory and production management system for a food and bakery business, with features for:
- Tracking raw materials and essence inventory
- Managing recipes and production
- Recording purchases and suppliers
- Generating reports and PDFs
- Multi-user access control
- PWA support for mobile use

---

**Last Updated**: December 12, 2025
**Version**: 1.0.0
**Status**: Active Development


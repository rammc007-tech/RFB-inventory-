# 🖥️ Localhost Setup Guide

## Quick Start

### Start Development Server
```bash
cd "/Users/ramelumalai/RFB Inventory 1"
npm install
npm run dev
```

### Access the App
- **URL:** http://localhost:3002
- **Login Page:** http://localhost:3002/login

## Login Credentials

- **Email:** admin@rfb.com
- **Password:** admin123

## App Features

✅ **Dashboard**
   - Total Items
   - Low Stock Items
   - Total Production
   - Total Inventory Value

✅ **Items Management**
   - Raw Materials
   - Essence
   - Stock levels
   - Unit conversions

✅ **Purchase Management**
   - Add purchases
   - Edit purchases
   - Delete purchases
   - Date filtering
   - Daily/Monthly totals
   - Print reports

✅ **Recipe Management**
   - Create recipes
   - Edit recipes
   - Scale recipes
   - Ingredient details
   - Print recipes

✅ **Production Tracking**
   - Record production
   - Date filtering
   - Daily/Monthly totals
   - Production cost tracking
   - Print reports

✅ **Reports**
   - Stock Report (with Raw Material & Essence totals)
   - Production Cost Report
   - Print functionality

✅ **Settings**
   - User Management
   - Access Control
   - Backup & Restore
   - Reset Options

## Server Information

- **Port:** 3002
- **Framework:** Next.js 14.0.4
- **Database:** SQLite (local)
- **Location:** `/Users/ramelumalai/RFB Inventory 1`

## Commands

### Start Server
```bash
npm run dev
```

### Stop Server
Press `Ctrl + C` in the terminal

### Build for Production
```bash
npm run build
npm start
```

### Database Commands
```bash
# Generate Prisma Client
npm run prisma:generate

# Run Migrations
npm run prisma:migrate

# Seed Database
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio
```

## Troubleshooting

### Port Already in Use
If port 3002 is already in use:
```bash
# Find process using port 3002
lsof -ti:3002

# Kill the process
kill -9 $(lsof -ti:3002)
```

### Dependencies Not Installed
```bash
npm install
```

### Database Issues
```bash
# Reset database
npx prisma migrate reset

# Seed database
npm run prisma:seed
```

## Notes

- The app uses SQLite database locally (stored in `prisma/dev.db`)
- All data is stored locally on your machine
- Changes made locally do not affect the deployed version
- For production deployment, use PostgreSQL (Vercel)

## Last Updated
December 11, 2025


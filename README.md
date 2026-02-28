# Manthan 2026 - Tech Fest Platform

Manthan is a full-stack Next.js platform for event discovery, registration, payment, admin operations, and entry-pass validation for a college tech fest.

![Manthan Logo](public/manthan_final_logo.png)

## Features

- Public event catalog (technical, cultural, sports)
- Multi-event registration with team details and server-side fee validation
- Razorpay order creation and secure signature verification
- Ticket/entry pass flow with QR code generation
- Admin module for login, registrations, check-in, stats, and cash payment marking
- CSV export endpoint for professor/committee data sharing
- Supabase-backed schema with RLS and performance indexes

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- Razorpay
- Framer Motion + Lucide React
- Zod validation

## Project Structure

- src/app - Pages and API routes
- src/components - Shared UI components
- src/lib - Types, constants, validations, Supabase clients
- src/lib/supabase/schema.sql - Base DB schema + policies + indexes
- update_schema.sql - Post-deployment DB optimizations/export view

## Environment Variables

Create .env.local in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Local Setup

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run lint
npm run build
npm run start
```

## Database Setup (Supabase)

1. Run src/lib/supabase/schema.sql in Supabase SQL Editor.
2. Run update_schema.sql in Supabase SQL Editor.

This adds:

- Backward-compatible columns for registrations
- GIN indexes for event_ids and team_registrations
- View organized_event_registrations_export for clean export rows

## Key API Routes

- /api/events - Public active events
- /api/payment/create-order - Create Razorpay order + pending registration
- /api/payment/verify - Verify signature, mark paid, generate QR
- /api/registration/[ticketId] - Fetch paid registration pass details

Admin routes:

- /api/admin/login
- /api/admin/registrations
- /api/admin/check-in/[id]
- /api/admin/stats
- /api/admin/cash-payment
- /api/admin/cash-payment/manual
- /api/admin/export

## Export Workflow

The view organized_event_registrations_export is designed for flat, sheet-friendly data. The admin export endpoint uses this view to generate CSV for faculty/committee sharing.

## Deployment (Vercel)

1. Set all environment variables in Vercel Project Settings.
2. Ensure Supabase schema + update SQL are already applied.
3. Deploy from main.

Pre-deploy check:

```bash
npm run lint
npm run build
```

## Notes

- Build currently passes with non-blocking warnings about img tags (can be migrated to next/image later).
- Payment and admin flows include compatibility handling for Supabase auth client differences.

---

Built for Manthan 2026 (BVIMIT).

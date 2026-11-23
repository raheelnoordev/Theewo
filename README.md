# EWO Technologies — Company Profile

Full-stack company profile website with a public marketing site and admin portal.

- **Frontend:** React + TypeScript + Vite + Tailwind CSS (`frontend/`)
- **Backend:** Node.js + Express + MySQL (`backend/`)
- **Database:** Hostinger MySQL (`u399796477_CompanyProfile`)

## Project structure

```
TheEwo/
├── backend/          # Node.js REST API
├── frontend/         # React public site + admin portal
└── companyprofile.client/   # Reference only (can be deleted)
```

## Quick start (local development)

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your Hostinger MySQL credentials
npm install
npm run seed    # Creates admin user + default site settings
npm run dev     # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev     # http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` to the backend.

### 3. Admin login

After running `npm run seed` in the backend:

- URL: `http://localhost:5173/admin/login`
- Email: value of `ADMIN_EMAIL` in `.env` (default `admin@ewotechnologies.com`)
- Password: value of `ADMIN_PASSWORD` in `.env`

## Hostinger deployment

### Database

Your tables are already created in phpMyAdmin. Run the seed script once to create the admin user:

```bash
cd backend
npm run seed
```

### Backend API

1. Upload the `backend/` folder to Hostinger (Node.js hosting or VPS).
2. Set environment variables from `.env.example`.
3. Run `npm install` and `npm start`.
4. Ensure `uploads/` is writable for image uploads.

### Frontend

1. Set production API URL in `frontend/.env`:

```
VITE_API_URL=https://your-api-domain.com/api
```

2. Build and upload static files:

```bash
cd frontend
npm run build
```

Upload the `dist/` folder to your Hostinger public web root.

## API overview

| Area | Endpoints |
|------|-----------|
| Auth | `POST /api/auth/login` |
| Public | `GET /api/services`, `/industries`, `/case-studies`, `/jobs`, `/pages`, `/team-members`, `/testimonials`, `/offices`, `/site-settings` |
| Forms | `POST /api/contact`, `POST /api/job-applications` |
| Admin | CRUD on all entities + `GET /api/dashboard/stats` + `POST /api/upload/image` |

All admin routes require `Authorization: Bearer <token>`.

## Admin portal features

Manage from `/admin/dashboard`:

- Services, Industries, Case Studies
- Jobs & Job Applications
- Team Members, Testimonials, Offices
- CMS Pages
- Contact messages inbox
- Site settings (hero stats, contact info, etc.)

## Notes

- The reference `companyprofile.client` folder was used for UI design only. This project uses your MySQL schema (Pages instead of Blogs, no newsletter table).
- Change `JWT_SECRET` and admin password before going live.

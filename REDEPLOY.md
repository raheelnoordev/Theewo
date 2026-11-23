# Redeploy checklist (Hostinger)

## What deploy.zip contains
- Backend code (`server.js`, `src/`)
- Frontend build (`public/`)
- Empty or local `uploads/` folder
- **Never** contains MySQL data
- **Never** auto-runs SQL on deploy

## SQL changes
- Always run SQL yourself in **phpMyAdmin**
- Do **not** re-run seed scripts on live unless you intend to add demo data

## Before every redeploy
1. In Hostinger File Manager (or SFTP), download/backup the live folder:
   - `uploads/` (all team photos, logos, appointment files)
2. Confirm Node **Environment Variables** still include SMTP_* and DB_* settings

## After every redeploy
1. Upload/restore your backed-up `uploads/` folder into the new app
2. Open `https://theewotech.com/api/health`
3. Open `https://theewotech.com/api/health/email` (SMTP must show configured/verified)
4. Spot-check homepage team photos and client logos

## Why images looked "dummy" before
- Database rows stayed
- Image **files** under `/uploads/` were replaced by an empty uploads folder from deploy.zip
- Homepage shows a stock photo when `imageUrl` file is missing

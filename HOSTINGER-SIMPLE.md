# Hostinger — Simple Deploy Guide (Beginner)

## One zip = website + API together

You do NOT need:
- `public_html/api` folder
- `api.theewotech.com` subdomain
- separate frontend and backend uploads

Upload **one file**: `deploy.zip`

---

## Step 1 — Create deploy.zip on your PC

Double-click or run:

```
E:\development\TheEwo\backend\build-deploy.bat
```

This creates: `E:\development\TheEwo\deploy.zip`

---

## Step 2 — Hostinger Node.js Deploy

1. hPanel → **Websites** → **theewotech.com**
2. Left menu → **Deployments**
3. Click **Settings and redeploy**
4. Upload **`deploy.zip`** (NOT backend.zip)
5. Settings:

| Field | Value |
|-------|-------|
| Framework | Express |
| Node version | 20.x |
| Root directory | `./` |
| Entry file | `server.js` |
| Package manager | npm |

6. Environment variables:

```
PORT=5000
NODE_ENV=production
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=u399796477_raheelnoor2001
DB_PASSWORD=your_password
DB_NAME=u399796477_CompanyProfile
JWT_SECRET=use_a_long_random_string
CORS_ORIGINS=https://theewotech.com,https://www.theewotech.com
ADMIN_EMAIL=admin@ewotechnologies.com
ADMIN_PASSWORD=Admin@Ewo2026
ADMIN_NAME=Site Administrator
```

7. **Connect database** in Essentials → select `u399796477_CompanyProfile`
8. Click **Save and Deploy**

---

## Step 3 — Clear public_html (important)

1. hPanel → **Files** → **public_html**
2. **Delete** these (Node app now serves the site):
   - `index.html`
   - `assets` folder
   - `backend.zip`
   - `dist.zip`

Leave empty or only `.htaccess` if needed.

---

## Step 4 — Test

Open in browser:

```
https://theewotech.com/api/health
```

**Good:** `{"status":"ok","database":"connected",...}`

```
https://theewotech.com/api/services
```

**Good:** JSON array with your services

```
https://theewotech.com
```

**Good:** Website loads with data

---

## Uploaded images (very important)

Hostinger runs the app from `hbuilds/versions/<id>/nodejs`, and that folder is **replaced on every
deploy**. Uploads are therefore stored one level outside it:

```
/home/u399796477/domains/theewotech.com/uploads
```

This folder survives redeploys. `deploy.zip` also no longer contains `uploads`, so a deploy can
never overwrite it. On every start the server copies any images found in older version folders or
in `public_html/uploads` into the persistent folder, so nothing is lost.

To inspect what the server sees:

```
https://theewotech.com/api/health/uploads
```

To override the location, set an environment variable in Deployments and redeploy:

```
UPLOADS_DIR=/home/u399796477/domains/theewotech.com/uploads
```

---

## If build fails

1. Deployments → **Runtime logs**
2. Common fixes:
   - Wrong password in DB_PASSWORD
   - Database not connected in Essentials
   - Wrong zip (use deploy.zip not backend.zip)

---

## Admin login

URL: https://theewotech.com/admin/login

Email: admin@ewotechnologies.com  
Password: Admin@Ewo2026

(Run `database/create-admin.sql` in phpMyAdmin if login fails)

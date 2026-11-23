# Hostinger Deployment — theewotech.com

## Why `/api` returns React HTML (your current problem)

`https://theewotech.com/api/health` shows the React "page not found" because:

1. **Frontend** is static files in `public_html` on the main domain
2. **Backend Node.js is NOT running on the main domain**
3. `.htaccess` sends unknown URLs to `index.html` → React loads instead of JSON

**Fix:** Deploy the API on a **subdomain** `api.theewotech.com`, then point the React build to that URL.

```
theewotech.com          → React static site (public_html)
api.theewotech.com      → Node.js Express API
```

---

## Your database

| Setting | Value |
|---------|-------|
| Database | `u399796477_CompanyProfile` |
| User | `u399796477_raheelnoor2001` |
| Host (on Hostinger server) | `127.0.0.1` |
| Host (from your PC) | `auth-db1412.hstgr.io` |

---

## STEP 1 — Deploy BACKEND on `api.theewotech.com`

### 1. Create subdomain in Hostinger

1. hPanel → **Domains → Subdomains**
2. Create: `api` → `theewotech.com`
3. Document root can be default (Node deployment will override)

### 2. Create Node.js app for the subdomain

1. hPanel → **Websites** → select **`api.theewotech.com`** (or add Node.js to subdomain)
2. **Upload backend zip** (see below)

### 3. Create backend zip

```powershell
cd E:\development\TheEwo\backend
Compress-Archive -Path package.json, package-lock.json, server.js, src, uploads -DestinationPath ..\backend.zip -Force
```

Zip must contain at root:
```
server.js          ← Hostinger entry file
package.json
src/server.js
...
```

### 4. Hostinger Node.js settings

| Setting | Value |
|---------|-------|
| Framework | **Express** |
| Node version | **20.x** |
| Entry file | **server.js** |
| Build command | `npm install` |
| Start command | `npm start` |
| Root directory | `.` |

### 5. Environment variables (api subdomain panel)

```
PORT=5000
NODE_ENV=production
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=u399796477_raheelnoor2001
DB_PASSWORD=your_database_password
DB_NAME=u399796477_CompanyProfile
JWT_SECRET=your_long_random_secret_min_32_chars
JWT_EXPIRES_IN=7d
CORS_ORIGINS=https://theewotech.com,https://www.theewotech.com,https://api.theewotech.com
ADMIN_EMAIL=admin@ewotechnologies.com
ADMIN_PASSWORD=YourSecureAdminPassword
ADMIN_NAME=Site Administrator
```

### 6. Connect database

In Hostinger Essentials → **Connect** → select `u399796477_CompanyProfile`

### 7. Deploy and test

Open in browser:

```
https://api.theewotech.com/api/health
```

**Must return JSON:**
```json
{"status":"ok","timestamp":"..."}
```

If you see HTML or 404, the Node app is not running on this subdomain yet.

### 8. Create admin user

Run once (locally with Remote MySQL, or Hostinger terminal):

```powershell
cd E:\development\TheEwo\backend
npm run seed
```

---

## STEP 2 — Rebuild FRONTEND with correct API URL

The live site must call `api.theewotech.com`, not `theewotech.com/api`.

File `frontend/.env.production` is already set to:

```
VITE_API_URL=https://api.theewotech.com/api
```

Rebuild and upload:

```powershell
cd E:\development\TheEwo\frontend
npm run build
```

Upload **everything inside** `frontend\dist\` to **`public_html/`** (main domain).

The updated `.htaccess` excludes `/api` from React routing (for future use).

---

## STEP 3 — Verify live site

| URL | Expected |
|-----|----------|
| https://theewotech.com | React homepage |
| https://api.theewotech.com/api/health | JSON `{"status":"ok"}` |
| https://api.theewotech.com/api/services | JSON array `[]` or data |
| https://theewotech.com/admin/login | Admin login page |

In browser DevTools → Network, API calls should go to **`api.theewotech.com`**, not `theewotech.com/api`.

---

## Local development

**Terminal 1 — Backend:**
```powershell
cd E:\development\TheEwo\backend
copy .env.example .env
# set DB_PASSWORD, enable Remote MySQL in Hostinger
npm install
npm run check-db
npm run seed
npm run dev
```

**Terminal 2 — Frontend:**
```powershell
cd E:\development\TheEwo\frontend
npm run dev
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `/api/health` returns React HTML | API not on main domain | Use `api.theewotech.com` subdomain |
| `ECONNREFUSED` locally | Backend not started | Run `npm run dev` in backend folder |
| Build failed on Hostinger | Wrong framework | Use **Express**, entry `server.js` |
| CORS error | Domain not allowed | Add domain to `CORS_ORIGINS` |
| Database error on server | Wrong host | Use `DB_HOST=127.0.0.1` on Hostinger |
| Empty services on site | No data yet | Add content in admin portal |

---

## Architecture

```
User
  │
  ├─► https://theewotech.com
  │       └── public_html (React build)
  │
  └─► https://api.theewotech.com/api/*
          └── Node.js Express (server.js)
                  └── MySQL 127.0.0.1 / u399796477_CompanyProfile
```

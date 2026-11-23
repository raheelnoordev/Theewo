# FIX: API Returns HTML Instead of JSON

## What is wrong?

Your browser calls:
```
https://theewotech.com/api/jobs
```

Hostinger returns **React index.html** (`content-type: text/html`) because:

| Domain | What runs there |
|--------|-----------------|
| `theewotech.com` | Static React files in `public_html` only |
| `api.theewotech.com` | **Not set up** (does not respond) |

There is **no Node.js API** on the main domain. `/api/*` is caught by the React site.

---

## The fix (3 steps)

### STEP 1 — Create API subdomain

1. hPanel → Domains → Subdomains
2. Create: `api` → `api.theewotech.com`
3. Wait 5–15 minutes for DNS

### STEP 2 — Deploy backend on api subdomain

Upload `backend.zip` to Node.js on **api.theewotech.com**

Test: `https://api.theewotech.com/api/health` must return JSON.

### STEP 3 — Re-upload frontend dist

Upload `frontend/dist/` to `public_html`.

Network tab must show `api.theewotech.com/api/jobs` not `theewotech.com/api/jobs`.

# GigFlow Deployment Guide

## Prerequisites

1. **MongoDB Atlas Account** - For cloud database
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string

2. **Netlify Account** - For frontend hosting
   - Sign up at [Netlify](https://www.netlify.com)

3. **Render Account** - For backend hosting
   - Sign up at [Render](https://render.com)

---

## Step 1: Deploy Backend on Render

### Option A: Deploy via Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `gigflow-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGODB_URI` | `your-mongodb-atlas-connection-string` |
   | `JWT_SECRET` | `your-secure-random-secret` |
   | `JWT_EXPIRE` | `7d` |
   | `JWT_COOKIE_EXPIRE` | `7` |
   | `CLIENT_URL` | `https://your-frontend.netlify.app` (add after frontend deploy) |
   | `RATE_LIMIT_WINDOW_MS` | `900000` |
   | `RATE_LIMIT_MAX_REQUESTS` | `100` |

6. Click **Create Web Service**

### Option B: Deploy via render.yaml

1. Push your code with `render.yaml` to GitHub
2. Go to Render Dashboard → **New** → **Blueprint**
3. Connect your repository
4. Render will detect `render.yaml` and configure automatically
5. Fill in the environment variables when prompted

---

## Step 2: Deploy Frontend on Netlify

### Option A: Deploy via Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub repository
4. Configure the build:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

5. Add Environment Variables (Site settings → Environment variables):
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://your-backend.onrender.com/api` |
   | `VITE_APP_NAME` | `GigFlow` |

6. Click **Deploy site**

### Option B: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend folder
cd frontend

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

---

## Step 3: Update CORS Settings

After both are deployed:

1. Go to Render Dashboard → Your backend service → Environment
2. Update `CLIENT_URL` to your Netlify URL (e.g., `https://gigflow.netlify.app`)
3. Render will auto-redeploy

---

## Quick Checklist

### Backend (Render)
- [ ] Connected to GitHub
- [ ] Root directory set to `backend`
- [ ] All environment variables configured
- [ ] MongoDB Atlas connection string added
- [ ] CLIENT_URL set to Netlify URL

### Frontend (Netlify)
- [ ] Connected to GitHub
- [ ] Base directory set to `frontend`
- [ ] `VITE_API_URL` set to Render backend URL
- [ ] Deploys successfully

---

## Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` in Render matches your Netlify URL exactly
- Don't include trailing slash

### 404 on Page Refresh (Netlify)
- The `netlify.toml` file handles this with redirects
- Make sure it's in the `frontend` folder

### MongoDB Connection Issues
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Check connection string format

### Environment Variables Not Working
- Netlify: Prefix with `VITE_` for frontend access
- Render: Redeploy after adding new variables

---

## Folder Structure for Deployment

```
gigflow/
├── backend/           ← Deploy to Render
│   ├── src/
│   ├── package.json
│   ├── render.yaml
│   └── .env.example
│
├── frontend/          ← Deploy to Netlify
│   ├── src/
│   ├── package.json
│   ├── netlify.toml
│   └── .env.example
│
└── DEPLOYMENT.md
```

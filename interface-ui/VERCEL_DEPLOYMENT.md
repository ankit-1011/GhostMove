# Vercel Deployment Guide - GhostMove Frontend

## 🚀 Quick Deployment Steps

### Step 1: Prepare Your Project

1. **Make sure your code is committed to Git**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Check your project structure**
   - Frontend code should be in `interface-ui/` folder
   - `package.json` should exist
   - `vite.config.ts` should exist

### Step 2: Deploy via Vercel Dashboard

#### Option A: GitHub Integration (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `interface-ui`
   - **Build Command**: `npm run build` (or `pnpm build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or `pnpm install`)

4. **Environment Variables** (if needed)
   - Add any required environment variables
   - For now, no env vars needed

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

#### Option B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd interface-ui
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Follow prompts**:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (first time)
   - Project name? `ghostmove` (or your choice)
   - Directory? `./` (current directory)
   - Override settings? **No**

6. **Production deployment**
   ```bash
   vercel --prod
   ```

### Step 3: Configure Build Settings

If deploying via dashboard, use these settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

Or create `vercel.json` in `interface-ui/` folder:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📝 Important Configuration

### 1. Root Directory

If your project structure is:
```
GhostMove/
  ├── interface-ui/
  │   ├── src/
  │   ├── package.json
  │   └── vite.config.ts
  └── programs/
```

**Set Root Directory to**: `interface-ui`

### 2. Build Command

- **npm**: `npm run build`
- **pnpm**: `pnpm build`
- **yarn**: `yarn build`

### 3. Output Directory

- **Vite default**: `dist`
- Make sure this matches your `vite.config.ts`

### 4. Node Version

Vercel automatically detects Node version from:
- `.nvmrc` file
- `package.json` engines field
- Or uses default (Node 18.x)

## 🔧 Troubleshooting

### Issue 1: Build Fails

**Error**: `Cannot find module` or build errors

**Solution**:
1. Check `package.json` has all dependencies
2. Make sure `node_modules` is in `.gitignore`
3. Try clearing cache in Vercel dashboard
4. Check build logs for specific errors

### Issue 2: 404 on Routes

**Error**: Routes return 404

**Solution**: Add `vercel.json` with rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Issue 3: Assets Not Loading

**Error**: Images or assets not loading

**Solution**:
1. Check `vite.config.ts` has correct `base` path
2. Make sure assets are in `public/` folder
3. Check build output includes assets

### Issue 4: Environment Variables

**Error**: Missing environment variables

**Solution**:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add required variables
3. Redeploy

## 📋 Pre-Deployment Checklist

- [ ] Code committed to Git
- [ ] `package.json` has all dependencies
- [ ] `vite.config.ts` configured correctly
- [ ] Build works locally (`npm run build`)
- [ ] No hardcoded localhost URLs
- [ ] Environment variables documented
- [ ] `.gitignore` includes `node_modules` and `dist`

## 🎯 Post-Deployment

### 1. Test Your Deployment

After deployment, test:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Wallet connection works
- [ ] All pages accessible
- [ ] No console errors

### 2. Custom Domain (Optional)

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 3. Environment Variables

If you need different env vars for production:
1. Go to Settings → Environment Variables
2. Add variables for "Production"
3. Redeploy

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

## 📝 Example vercel.json

Create `interface-ui/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🚀 Quick Start Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (development)
cd interface-ui
vercel

# Deploy (production)
vercel --prod

# View deployments
vercel ls
```

## ✅ Success Indicators

After successful deployment:
- ✅ Build completes without errors
- ✅ Preview URL works
- ✅ All routes accessible
- ✅ Assets load correctly
- ✅ No console errors

---

**Need Help?** Check Vercel documentation or build logs in dashboard.

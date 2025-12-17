# Deploying to Cloudflare Pages

## Prerequisites
- Your domain `accendoworld.com` is already added to Cloudflare
- You have a GitHub account (recommended) or can use direct upload

## Method 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub (e.g., `accendoworld`)
2. Run these commands in your terminal:
```bash
cd "C:\Users\369sh\OneDrive\Desktop\Apps\accendorworld"
git init
git add .
git commit -m "Initial commit: Beautiful ACCENDO website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/accendoworld.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages
1. Log in to your Cloudflare dashboard
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select your `accendoworld` repository
7. Configure build settings:
   - **Production branch:** `main`
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
8. Click **Save and Deploy**

### Step 3: Configure Custom Domain
1. Once deployed, go to your project settings
2. Click on **Custom domains**
3. Click **Set up a custom domain**
4. Enter `accendoworld.com`
5. Cloudflare will automatically configure the DNS records
6. Your site will be live at https://accendoworld.com in a few minutes!

## Method 2: Direct Upload (Quick Test)

1. Build the site:
```bash
npm run build
```

2. In Cloudflare Dashboard:
   - Go to **Pages** > **Create a project**
   - Choose **Direct Upload**
   - Upload the `out` folder
   - Set up custom domain as described above

## Automatic Deployments
With GitHub integration, Cloudflare Pages will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Environment Variables (If Needed Later)
If you add environment variables:
1. Go to your project in Cloudflare Pages
2. Navigate to **Settings** > **Environment variables**
3. Add your variables for Production and/or Preview environments

## DNS Configuration
Your DNS should already be configured through Cloudflare. If you need to verify:
1. Go to **DNS** in Cloudflare dashboard
2. Ensure you have:
   - An A record or CNAME pointing to your Cloudflare Pages deployment
   - Cloudflare's proxy enabled (orange cloud icon)

## That's it!
Your beautiful ACCENDO website is now live globally on Cloudflare's edge network!

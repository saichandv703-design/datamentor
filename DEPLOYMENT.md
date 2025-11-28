# DataLearn Platform - Deployment Guide

## Step 1: Upload to GitHub

Since the repository is private or not yet created, here's how to get your code on GitHub:

### Option A: Using Git Locally (Recommended)

1. **Make sure the repository exists on GitHub:**
   - Go to https://github.com/saichandv703-design/datamentor
   - If it doesn't exist, create it (keep it public for easier deployment)

2. **On your local machine, run these commands:**

```bash
# Navigate to a directory where you want to clone
cd ~/Documents

# Clone the empty repo
git clone https://github.com/saichandv703-design/datamentor.git
cd datamentor

# Copy all project files here (you'll need to download them from the cloud environment)
```

3. **Then push:**

```bash
git add .
git commit -m "Initial commit: DataLearn platform"
git push origin main
```

### Option B: Using GitHub Web Interface

1. Go to https://github.com/saichandv703-design/datamentor
2. Click "Add file" → "Upload files"
3. Drag and drop ALL project files:
   - All files from `src/` folder
   - `package.json`, `package-lock.json`
   - `index.html`, `vite.config.ts`
   - `tailwind.config.js`, `postcss.config.js`
   - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
   - `eslint.config.js`
   - `.gitignore`
   - `netlify.toml` (important for deployment!)
   - `README.md`
4. Commit the changes

## Step 2: Deploy to Netlify

1. **Go to:** https://app.netlify.com/
2. **Sign in** (use GitHub authentication for easiest setup)
3. **Click:** "Add new site" → "Import an existing project"
4. **Choose:** GitHub
5. **Select:** `saichandv703-design/datamentor` repository
6. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
7. **Environment variables** (CRITICAL - Add these in Netlify):
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key

   (These values are in your `.env` file - do NOT commit the .env file to GitHub!)

8. **Click:** "Deploy site"

Your site will be live in 2-3 minutes at a URL like: `https://random-name-123456.netlify.app`

You can customize the domain in Netlify settings.

## Step 3: Verify Deployment

Once deployed, test these features:
- Homepage loads correctly
- Course catalog displays
- User registration/login works
- Course enrollment functions
- Database connections work

## Troubleshooting

**Build fails?**
- Check that all environment variables are set in Netlify
- Verify the build command is `npm run build`
- Check build logs for specific errors

**Site loads but database doesn't work?**
- Verify environment variables are correct
- Check Supabase project is active
- Verify RLS policies are set up correctly

**Routing issues (404 on refresh)?**
- The `netlify.toml` file handles this - make sure it's uploaded

## Need Help?

Contact support or check Netlify documentation at: https://docs.netlify.com/

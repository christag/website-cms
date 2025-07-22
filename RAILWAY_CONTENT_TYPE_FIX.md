# Fix Content Type Registration - Railway Deployment

## The Problem
Getting 404s on API endpoints despite correct permissions indicates content types aren't registered in the database.

## Step 1: Check Content Types in Strapi Admin

1. Go to: https://website-cms-production-96f5.up.railway.app/admin
2. Navigate to **Content Manager** in the left sidebar
3. Check if you see these content types listed:
   - **Service** (Collection Type)
   - **Bio Article** (Collection Type) 
   - **Profile** (Single Type)
   - **Settings** (Single Type)

**If content types are MISSING from the admin panel**, proceed to Step 2.
**If content types are VISIBLE but APIs return 404**, proceed to Step 3.

## Step 2: Force Content Type Registration

### Option A: Restart Railway Service
1. Go to your Railway dashboard
2. Find your CMS service
3. Click **Settings** → **Restart Service**
4. Wait for deployment to complete
5. Check admin panel again

### Option B: Redeploy from GitHub (Recommended)
1. Make a small change to trigger deployment:
   ```bash
   # In your local website-cms directory
   echo "# Trigger deployment" >> README.md
   git add README.md
   git commit -m "trigger cms deployment"
   git push origin main
   ```
2. Railway will redeploy automatically
3. Check admin panel after deployment

## Step 3: Database Issues - Run Migrations

If content types appear in admin but APIs still return 404:

### Access Railway Console
```bash
# Install Railway CLI if you don't have it
npm install -g @railway/cli

# Login and connect to your project
railway login
railway link

# Run Strapi console commands
railway run npm run strapi console
```

### Or use Railway Dashboard
1. Go to Railway dashboard
2. Click on your CMS service
3. Go to **Deploy** tab
4. Click **View Logs** to see if there are any startup errors

## Step 4: Manual Content Type Check

### Verify File Structure
Your content types should be structured like this:
```
src/api/
├── service/
│   ├── content-types/service/
│   │   ├── index.js ✓
│   │   └── schema.json ✓
│   ├── controllers/service.js ✓
│   ├── routes/service.js ✓
│   └── services/service.js ✓
├── bio-article/
├── profile/
└── settings/
```

All these files exist in your repo, so this should be correct.

## Step 5: Create Test Content

Once content types appear in admin:

1. Go to **Content Manager**
2. Create a test service:
   - Title: "Test Service"
   - Description: "Test description"
   - Set isPinned: false
   - **Click Publish** (not just Save)

3. Test the API directly:
   - https://website-cms-production-96f5.up.railway.app/api/services

## Step 6: Check Railway Environment Variables

Ensure these are set in Railway:

```bash
DATABASE_URL=postgresql://... (auto-provided by Railway)
NODE_ENV=production
ADMIN_JWT_SECRET=your-secret
API_TOKEN_SALT=your-salt
APP_KEYS=your-app-keys
```

## Step 7: Advanced Debugging

### Check Railway Logs
1. Railway dashboard → Your CMS service
2. **Deploy** tab → **View Logs**
3. Look for errors like:
   - Content type registration errors
   - Database connection issues
   - Missing table errors

### Common Error Messages to Look For:
- `relation "services" does not exist`
- `Content type not found`
- `Route not found`

## Step 8: Nuclear Option - Fresh Deployment

If nothing else works:

1. **Backup your data** (export from Strapi admin)
2. In Railway dashboard:
   - Delete the PostgreSQL database service
   - Redeploy the CMS service
   - Railway will create a fresh database
3. **Recreate your content** in the admin panel

## Expected Result

After fixing, these should work:
- https://website-cms-production-96f5.up.railway.app/api/services
- https://website-cms-production-96f5.up.railway.app/api/bio-articles  
- https://website-cms-production-96f5.up.railway.app/api/profile
- https://website-cms-production-96f5.up.railway.app/api/settings

They should return JSON data, not 404 errors.

## Most Likely Solution

Based on your setup, I suspect **Step 2 (redeployment)** will fix the issue. Railway sometimes doesn't properly register content types on initial deployment, and a fresh deployment usually resolves it. 
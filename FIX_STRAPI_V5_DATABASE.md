# Fix Strapi v5 Database Schema Issues on Railway

## The Problem

Your Strapi v5 deployment has database schema issues causing:
- 404 errors on all API endpoints
- Database errors: `column "up_users.document_id" must appear in the GROUP BY clause`
- Content types not properly registered

## Root Cause

Strapi v5 requires specific database migrations that haven't run properly on your Railway PostgreSQL instance.

## Solution: Reset and Migrate Database

### Option 1: Force Database Migration (Recommended First)

1. **Add this environment variable to Railway:**
   ```bash
   FORCE_MIGRATION=true
   ```

2. **Create a migration script:**
   ```bash
   # In website-cms directory
   npm run strapi db:force-migration
   ```

### Option 2: Reset Database Tables (If Option 1 Fails)

**WARNING**: This will delete all existing content!

1. **Access Railway PostgreSQL**:
   - Go to Railway dashboard
   - Click on your PostgreSQL service
   - Go to **Connect** tab
   - Copy the connection string

2. **Connect to database** (using psql or a tool like pgAdmin):
   ```sql
   -- Drop Strapi tables (keeps your database, just resets Strapi)
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   GRANT ALL ON SCHEMA public TO postgres;
   GRANT ALL ON SCHEMA public TO public;
   ```

3. **Redeploy Strapi**:
   - In Railway, go to your CMS service
   - Click **Redeploy** or push a commit

### Option 3: Fresh Strapi Installation (Nuclear Option)

1. **Backup any important data** from Strapi admin

2. **Delete and recreate the database service in Railway**:
   - Remove PostgreSQL service
   - Add new PostgreSQL service
   - Update environment variables

3. **Clear Strapi cache and redeploy**:
   ```bash
   # In website-cms
   rm -rf .cache .tmp
   git add -A
   git commit -m "clear strapi cache for fresh install"
   git push origin main
   ```

## Quick Fix to Try First

### Add Database Sync Environment Variable

1. Go to Railway dashboard → CMS service → Variables
2. Add these environment variables:
   ```bash
   DATABASE_FORCE_SYNC=true
   STRAPI_DISABLE_UPDATE_NOTIFICATION=true
   NODE_ENV=production
   ```

3. Redeploy the service

### Update package.json Start Script

Update your `website-cms/package.json`:
```json
{
  "scripts": {
    "start": "strapi start",
    "postinstall": "strapi db:migrate"
  }
}
```

This ensures migrations run after deployment.

## Verify Content Types Are Registered

After fixing the database:

1. **Check Strapi Admin**:
   - Go to: https://website-cms-production-96f5.up.railway.app/admin
   - Navigate to **Content-Type Builder**
   - Verify all content types exist:
     - Service (Collection)
     - Bio Article (Collection)
     - Profile (Single)
     - Settings (Single)

2. **If content types are missing**:
   - They need to be recreated through the admin UI
   - Or restore from a backup

## Test API Endpoints

Once database is fixed, test these:
```bash
# Should return empty arrays or data, not 404s
curl https://website-cms-production-96f5.up.railway.app/api/services
curl https://website-cms-production-96f5.up.railway.app/api/bio-articles
curl https://website-cms-production-96f5.up.railway.app/api/profile
curl https://website-cms-production-96f5.up.railway.app/api/settings
```

## Alternative: Use Strapi Cloud Database

If Railway PostgreSQL continues to have issues:
1. Use Strapi Cloud (has proper v5 support)
2. Use Neon.tech PostgreSQL (better Strapi v5 compatibility)
3. Use Supabase PostgreSQL

## The Real Issue

The core problem is that Strapi v5's database schema isn't being properly created on Railway's PostgreSQL. This requires either:
- Running proper migrations
- Starting fresh with a clean database
- Using a database provider with better Strapi v5 support 
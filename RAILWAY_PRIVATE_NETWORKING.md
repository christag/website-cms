# Railway Private Networking Setup

## Problem
Your CMS is using the public database endpoint which:
- Incurs egress fees 
- May cause connectivity issues (potentially contributing to 404 errors)
- Is less performant than private networking

## Solution: Switch to Private Networking

### Step 1: Update Environment Variables in Railway Dashboard

1. Go to your Railway dashboard
2. Select your **CMS service** (website-cms)
3. Go to **Variables** tab
4. Add this new environment variable:

```bash
# Add this NEW variable (don't replace DATABASE_URL)
DATABASE_PRIVATE_URL=${{Postgres.DATABASE_PRIVATE_URL}}
```

**Important Notes:**
- Replace `Postgres` with your actual PostgreSQL service name in Railway
- You can find the service name in your Railway dashboard
- The `${{}}` syntax is Railway's reference variable syntax
- Keep your existing `DATABASE_URL` as a fallback

### Step 2: Find Your PostgreSQL Service Name

1. In Railway dashboard, look for your PostgreSQL service
2. Click on it and note the name (usually something like "Postgres" or "PostgreSQL")
3. Use that exact name in the reference variable

### Step 3: Alternative Reference Variables

If the above doesn't work, try these alternatives:

```bash
# Option 1: Use the private URL directly
DATABASE_PRIVATE_URL=${{Postgres.DATABASE_PRIVATE_URL}}

# Option 2: If your service has a different name
DATABASE_PRIVATE_URL=${{YourPostgreSQLServiceName.DATABASE_PRIVATE_URL}}

# Option 3: Build the URL manually using private domain
DATABASE_PRIVATE_URL=postgresql://${{Postgres.PGUSER}}:${{Postgres.PGPASSWORD}}@${{Postgres.RAILWAY_PRIVATE_DOMAIN}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
```

### Step 4: Deploy the Changes

After updating both the code and environment variables:

1. **Commit and push** the database.ts and server.ts changes:
   ```bash
   git add config/database.ts config/server.ts
   git commit -m "configure private networking for railway database"
   git push origin main
   ```

2. **Railway will auto-deploy** with the new configuration

### Step 5: Verify the Fix

After deployment, check the Railway logs:

1. Go to your CMS service in Railway
2. **Deploy** tab → **View Logs**
3. Look for the debug output:
   ```
   Database configuration debug:
   DATABASE_PRIVATE_URL exists: true
   ```

You should also see the egress warning disappear from Railway.

## Expected Benefits

- ✅ **No more egress fees**
- ✅ **Better performance** (private network is faster)
- ✅ **Improved reliability** (may fix the 404 issues)
- ✅ **Proper IPv6 binding** for Railway's internal network

## Troubleshooting

### If DATABASE_PRIVATE_URL shows as "not-set":

1. **Check service name**: Make sure you're using the exact PostgreSQL service name
2. **Check reference syntax**: Use `${{ServiceName.DATABASE_PRIVATE_URL}}`
3. **Try manual URL**: Use Option 3 above to build the URL manually

### If still getting 404s after deployment:

The private networking fix may resolve the underlying connectivity issues. Wait for deployment to complete and test the API endpoints again.

## What We Changed

1. **database.ts**: Now prefers `DATABASE_PRIVATE_URL` over `DATABASE_URL`
2. **server.ts**: Binds to IPv6 (`::`) on Railway for private networking compatibility
3. **Environment**: Added `DATABASE_PRIVATE_URL` using Railway reference variables

This should resolve both the egress fee warning and potentially improve the API connectivity issues you're experiencing. 
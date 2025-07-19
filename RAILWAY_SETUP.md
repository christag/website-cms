# Railway Setup Guide - Strapi + PostgreSQL

## Current Issue: Database Connection Failed

The error `connect ECONNREFUSED fd12:be93:1db7:0:a000:17:87d8:a229:5432` indicates Strapi cannot connect to PostgreSQL.

## Step-by-Step Fix

### 1. Check PostgreSQL Service

In Railway Dashboard:
1. Go to your project
2. Ensure **PostgreSQL service is running** (green status)
3. If not running, click **Deploy** to restart it

### 2. Get Database Connection String

1. **Click on PostgreSQL service**
2. **Go to "Connect" tab**
3. **Copy the "Postgres Connection URL"**
   - Should look like: `postgresql://postgres:password@junction.proxy.rlwy.net:12345/railway`

### 3. Configure Strapi Environment Variables

In your **Strapi service** (not PostgreSQL service), set these environment variables:

#### Required Variables:
```bash
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:password@junction.proxy.rlwy.net:12345/railway

# Alternative individual variables (if DATABASE_URL doesn't work):
DATABASE_HOST=junction.proxy.rlwy.net
DATABASE_PORT=12345
DATABASE_NAME=railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password-from-railway
DATABASE_SSL=false

# Strapi Configuration
NODE_ENV=production
STRAPI_URL=https://your-app-name.up.railway.app
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

### 4. Generate Strapi Secrets

If you don't have the Strapi secrets, generate them:

```bash
# Run locally to generate secrets
npx strapi generate
```

Or use these commands to generate them manually:
```bash
# Generate random strings for secrets
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### 5. Deploy and Test

1. **Save environment variables** in Railway
2. **Redeploy Strapi service**
3. **Check logs** for connection success
4. **Access Strapi admin** at `https://your-app.up.railway.app/admin`

## Common Issues & Solutions

### Issue: IPv6 Connection Error
**Error**: `connect ECONNREFUSED fd12:...`

**Solution**: Railway sometimes uses IPv6. Ensure your connection string uses the hostname, not an IP address.

### Issue: SSL Connection Error
**Error**: `SSL connection required`

**Solutions**:
1. Set `DATABASE_SSL=true`
2. Or add `?sslmode=require` to your DATABASE_URL
3. Or use `?sslmode=disable` if SSL isn't required

### Issue: Authentication Failed
**Error**: `password authentication failed`

**Solution**: 
1. Get the correct password from Railway PostgreSQL service
2. Ensure USERNAME is `postgres` (Railway default)
3. Check if password contains special characters that need URL encoding

### Issue: Database Not Found
**Error**: `database "railway" does not exist`

**Solution**: Railway creates a database named `railway` by default. Use this name.

## Debugging Steps

### 1. Check Service Status
```bash
# In Railway dashboard, verify both services are running:
- PostgreSQL service: Should be green/active
- Strapi service: Should be green/active (after fixing connection)
```

### 2. Test Database Connection
You can test the connection using the Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and connect
railway login
railway link

# Test database connection
railway run --service postgresql psql $DATABASE_URL
```

### 3. Check Strapi Logs
In Railway Dashboard:
1. Click on **Strapi service**
2. Go to **Deployments** tab
3. Click on latest deployment
4. Check logs for detailed error messages

## Environment Variables Checklist

### PostgreSQL Service (Auto-configured by Railway):
- ✅ `PGUSER`
- ✅ `PGPASSWORD` 
- ✅ `PGHOST`
- ✅ `PGPORT`
- ✅ `PGDATABASE`
- ✅ `DATABASE_URL`

### Strapi Service (You need to set):
- ⬜ `DATABASE_CLIENT=postgres`
- ⬜ `DATABASE_URL` (copy from PostgreSQL service)
- ⬜ `NODE_ENV=production`
- ⬜ `APP_KEYS`
- ⬜ `API_TOKEN_SALT`
- ⬜ `ADMIN_JWT_SECRET`
- ⬜ `TRANSFER_TOKEN_SALT`
- ⬜ `JWT_SECRET`

## Next Steps After Fix

Once Strapi is running:

1. **Access Admin Panel**: `https://your-app.up.railway.app/admin`
2. **Create Admin User**: First time setup
3. **Create Content Types**: Set up your bio article content type
4. **Generate API Token**: For the website to fetch content
5. **Test API**: Verify endpoints work at `https://your-app.up.railway.app/api`

## Railway-Specific Tips

1. **Service Linking**: Railway automatically provides connection details between services
2. **Environment Variables**: Use the Railway dashboard to manage env vars
3. **Logs**: Always check deployment logs for detailed error messages
4. **Networking**: Railway handles internal networking automatically
5. **Scaling**: Railway auto-scales based on usage 
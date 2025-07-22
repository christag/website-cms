# Fix API Permissions - Strapi CMS

## Quick Fix Steps

### 1. Login to Strapi Admin
Go to: https://website-cms-production-96f5.up.railway.app/admin

### 2. Navigate to Permissions
- Click **Settings** in the left sidebar
- Click **Users & Permissions plugin**
- Click **Roles**
- Click **Public**

### 3. Enable API Access
You need to enable the following permissions for each content type:

#### For Service (Collection Type):
- ✅ find (to list all services)
- ✅ findOne (to get individual service details)

#### For Bio-article (Collection Type):
- ✅ find (to list all bio articles)
- ✅ findOne (to get individual bio article)

#### For Profile (Single Type):
- ✅ find (to get the profile)

#### For Settings (Single Type):
- ✅ find (to get the settings)

### 4. Save Changes
- Click the **Save** button at the top right
- The button should turn green when saved

### 5. Test the API
After saving, test these endpoints directly:
- https://website-cms-production-96f5.up.railway.app/api/services
- https://website-cms-production-96f5.up.railway.app/api/bio-articles
- https://website-cms-production-96f5.up.railway.app/api/profile
- https://website-cms-production-96f5.up.railway.app/api/settings

## Alternative: Using API Token (If Public Access Not Desired)

If you prefer to keep the endpoints private and use the API token:

### 1. Navigate to API Tokens
- Settings → API Tokens
- Click "Create new API Token"

### 2. Configure Token
- **Name**: Frontend Access
- **Token duration**: Unlimited
- **Token type**: Read-only

### 3. Set Permissions
Enable find/findOne for:
- Service
- Bio-article  
- Profile
- Settings

### 4. Update Frontend
The token should already be set in your Cloudflare environment variables as `STRAPI_API_TOKEN`.

## Verifying the Fix

Once permissions are configured, your frontend should start receiving data. The logs should show:
- 200 status codes instead of 404
- Actual content data in the responses

## Common Issues

### Still Getting 404s?
- Make sure you clicked "Save" after setting permissions
- Check that you enabled permissions for the "Public" role, not "Authenticated"
- Verify the content types have published content (not just drafts)

### Empty Responses?
- You need to create and **publish** content in Strapi
- Draft content won't appear in API responses
- Go to Content Manager and ensure items show "Published" status 
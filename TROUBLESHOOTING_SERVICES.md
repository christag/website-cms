# Troubleshooting Services Page

## Issue: "Can't load the CMS" on Services Page

### Solution Steps:

1. **Restart Strapi** after creating the Service content type:
   ```bash
   npm run develop
   # or
   npm run start
   ```

2. **Configure API Permissions**:
   - Go to Strapi Admin Panel
   - Navigate to: Settings → Users & Permissions → Roles → Public
   - Find "Service" in the permissions list
   - Enable these permissions:
     - `find` - To list all services
     - `findOne` - To get individual service details
   - Click "Save"

3. **Add Test Service**:
   - Go to Content Manager → Service
   - Click "Create new entry"
   - Fill in required fields:
     - Title: "Test Service"
     - Description: "Test description"
     - isPinned: false
   - Add a slug (should auto-generate from title)
   - Save and Publish

4. **Verify API Access**:
   - Test the API endpoint: `http://localhost:1337/api/services`
   - Should return your test service

5. **Check Frontend API Configuration**:
   - Ensure `STRAPI_URL` is set correctly in your `.env` file
   - If using authentication, ensure `STRAPI_API_TOKEN` is set

## Common Issues:

### "403 Forbidden" Error
- API permissions not configured (see step 2)
- API token missing or invalid

### "404 Not Found" Error
- Service content type not created properly
- Strapi not restarted after creating content type

### Empty Response
- No services published in Strapi
- Draft & Publish is enabled but items aren't published

### Services Page Works But No Data
- Check if services are marked as "Published" in Strapi
- Verify the API response includes your data
- Check browser console for JavaScript errors 
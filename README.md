# Chris's Portfolio CMS - Strapi 5

A production-ready Strapi 5 headless CMS powering [christagliaferro.com](https://www.christagliaferro.com) with advanced content modeling and Railway deployment.

## 🚀 Overview

This Strapi 5 CMS provides content management for a modern portfolio and consulting website with:

- **Content Types**: Bio articles, author profile, and site settings
- **Production Deployment**: Railway with PostgreSQL database
- **API Integration**: REST endpoints for frontend consumption
- **Webhook Support**: Automatic site rebuilds on content changes
- **Error Handling**: Graceful degradation with fallback content

## 🛠️ Tech Stack

- **CMS**: [Strapi 5.18.1](https://strapi.io/) - Latest headless CMS
- **Database**: PostgreSQL with automated backups
- **Hosting**: [Railway](https://railway.app/) with environment management
- **API**: REST endpoints with proper error handling
- **Security**: Environment variable management and access controls

## 📋 Content Types

### Profile (Single Type)
**API Endpoint**: `/api/profile`

Author profile information including:
- Full name and bio
- Professional role and location
- Social links and contact information
- Timeline events and career history

### Settings (Single Type)
**API Endpoint**: `/api/settings`

Global site configuration:
- Site title and description
- Default SEO metadata
- Brand colors and logos
- Global contact information

### Bio Articles (Collection Type)
**API Endpoint**: `/api/bio-articles`

Dynamic content pieces for the bio section:
- Article title and content (richtext field, not markdown)
- Publication status
- Metadata and timestamps

### Services (Collection Type)
**API Endpoint**: `/api/services`

IT consulting and technology services:
- Title, slug, and description
- Category and feature highlights (JSON)
- Tiered pricing with deliverables (component)
- Contact method and pinned status

## 🚀 Quick Start

### Development Setup

```bash
# Install dependencies
npm install

# Setup environment variables (see below)
cp .env.example .env

# Start development server
npm run develop

# Access admin panel at http://localhost:1337/admin
```

### Production Commands

```bash
# Build for production
npm run build

# Start production server
npm run start

# Deploy to Railway (automatic via GitHub)
git push origin main
```

## 🔧 Environment Configuration

### Development (.env)

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/strapi_dev

# Admin
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=your-app-keys

# Optional: Webhook for local development
STATIC_SITE_WEBHOOK_URL=http://localhost:4321/api/webhook
```

### Production (Railway)

Set these environment variables in Railway dashboard:

```bash
# Database (Auto-provided by Railway PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:port/db

# Security
ADMIN_JWT_SECRET=your-production-jwt-secret
API_TOKEN_SALT=your-production-api-token-salt
APP_KEYS=your-production-app-keys

# Site Integration
STATIC_SITE_WEBHOOK_URL=https://your-cloudflare-pages-webhook
NODE_ENV=production
```

## 🏗️ Project Structure

```text
website-cms/
├── config/
│   ├── admin.ts              # Admin panel configuration
│   ├── api.ts                # API configuration
│   ├── database.ts           # Database connection
│   ├── middlewares.ts        # Middleware stack
│   ├── plugins.ts            # Plugin configuration
│   └── server.ts             # Server configuration
├── database/
│   └── migrations/           # Database migrations
├── src/
│   ├── admin/               # Admin panel customizations
│   ├── api/
│   │   ├── bio-article/     # Bio articles content type
│   │   │   ├── content-types/
│   │   │   │   └── bio-article/
│   │   │   │       ├── index.js      # Content type definition
│   │   │   │       ├── schema.json   # Content type schema
│   │   │   │       └── lifecycles.ts # Lifecycle hooks
│   │   │   ├── controllers/
│   │   │   │   └── bio-article.js    # API controller
│   │   │   ├── routes/
│   │   │   │   └── bio-article.js    # API routes
│   │   │   └── services/
│   │   │       └── bio-article.js    # Business logic
│   │   ├── profile/         # Author profile (single type)
│   │   │   ├── content-types/
│   │   │   │   └── profile/
│   │   │   │       ├── index.js
│   │   │   │       ├── schema.json
│   │   │   │       └── lifecycles.ts
│   │   │   ├── controllers/
│   │   │   │   └── profile.js
│   │   │   ├── routes/
│   │   │   │   └── profile.js
│   │   │   └── services/
│   │   │       └── profile.js
│   │   └── settings/        # Site settings (single type)
│   │       ├── content-types/
│   │       │   └── settings/
│   │       │       ├── index.js
│   │       │       ├── schema.json
│   │       │       └── lifecycles.ts
│   │       ├── controllers/
│   │       │   └── settings.js
│   │       ├── routes/
│   │       │   └── settings.js
│   │       └── services/
│   │           └── settings.js
│   │   └── service/         # Services (collection type)
│   │       ├── content-types/
│   │       │   └── service/
│   │       │       ├── index.js
│   │       │       └── schema.json
│   │       ├── controllers/
│   │       │   └── service.js
│   │       ├── routes/
│   │       │   └── service.js
│   │       └── services/
│   │           └── service.js
│   ├── components/
│   │   ├── shared/          # Reusable components
│   │   │   ├── contact-info.json
│   │   │   ├── hero-data.json
│   │   │   ├── seo-data.json
│   │   │   ├── social-link.json
│   │   │   └── timeline-event.json
│   │   ├── services/        # Service-specific components
│   │   │   └── pricing-tier.json
│   │   └── portfolio/       # Portfolio components
│   │       ├── collaborator.json
│   │       └── testimonial.json
│   ├── extensions/          # Plugin extensions
│   └── index.ts            # Entry point
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   └── uploads/            # Media uploads
├── package.json
└── tsconfig.json
```

## 🔗 API Endpoints

### Content Types

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET | Get author profile (single type) |
| `/api/settings` | GET | Get site settings (single type) |
| `/api/bio-articles` | GET | Get all bio articles |
| `/api/bio-articles/:id` | GET | Get specific bio article |
| `/api/services` | GET | Get all services |
| `/api/services/:id` | GET | Get specific service |

### Query Parameters

```bash
# Populate relations
GET /api/profile?populate=*

# Filter and sort
GET /api/bio-articles?filters[publishedAt][$notNull]=true&sort=createdAt:desc

# Pagination
GET /api/bio-articles?pagination[page]=1&pagination[pageSize]=10
```

## 🔄 Webhook Integration

### Automatic Site Rebuilds

The CMS triggers webhook calls to rebuild the static site when content changes:

```typescript
// Lifecycle hooks trigger webhooks
export default {
  async afterCreate(event: any) {
    await triggerWebhook('entry.create', 'profile', event.result);
  },
  
  async afterUpdate(event: any) {
    await triggerWebhook('entry.update', 'profile', event.result);
    
    // Handle publish/unpublish
    if (event.result.publishedAt && !event.params.data.publishedAt) {
      await triggerWebhook('entry.publish', 'profile', event.result);
    }
  },
  
  async afterDelete(event: any) {
    await triggerWebhook('entry.delete', 'profile', event.result);
  },
};
```

### Webhook Configuration

Set `STATIC_SITE_WEBHOOK_URL` to your deployment platform's webhook:

```bash
# Cloudflare Pages
STATIC_SITE_WEBHOOK_URL=https://api.cloudflare.com/client/v4/pages/webhooks/deploy/YOUR_WEBHOOK_ID

# Netlify
STATIC_SITE_WEBHOOK_URL=https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID

# Vercel
STATIC_SITE_WEBHOOK_URL=https://api.vercel.com/v1/integrations/deploy/YOUR_DEPLOY_HOOK
```

## 🚀 Railway Deployment

### Automatic Deployment

The CMS automatically deploys to Railway when changes are pushed to the main branch:

1. **GitHub Integration**: Railway monitors the repository
2. **Build Process**: Automatic npm install and build
3. **Database Setup**: PostgreSQL database provisioned automatically
4. **Environment Variables**: Configured through Railway dashboard
5. **Domain**: Custom domain or Railway-provided URL

### Railway Configuration

1. **Connect Repository**: Link your GitHub repository to Railway
2. **Add PostgreSQL**: Add PostgreSQL database service
3. **Set Environment Variables**: Configure production environment
4. **Deploy**: Automatic deployment on git push

### Database Management

```bash
# Access Railway database
railway connect postgresql

# Run migrations
railway run npm run strapi:migrate

# Create admin user
railway run npm run strapi admin:create-user
```

## 🔧 Development Workflow

### Content Type Development

1. **Create Content Type**: Use Strapi admin or CLI
2. **Define Schema**: Configure fields and relations
3. **Add Controllers**: Custom API logic if needed
4. **Setup Lifecycles**: Webhook triggers for content changes
5. **Test API**: Verify endpoints work correctly

### Adding New Content Types

```bash
# Generate new content type
npx strapi generate content-type

# Or create manually:
# 1. Create directory structure in src/api/
# 2. Add schema.json, index.js, controllers, routes, services
# 3. Add lifecycle hooks if needed
```

## 🛡️ Security & Best Practices

### Production Security

- **Environment Variables**: Never commit secrets to repository
- **Database Access**: Restrict database access to Railway network
- **API Tokens**: Use API tokens for frontend authentication
- **Admin Access**: Secure admin panel with strong passwords
- **CORS Configuration**: Restrict API access to your domains

### Content Security

```javascript
// config/middlewares.ts
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 📊 Performance & Monitoring

### Railway Monitoring

- **Resource Usage**: Monitor CPU, memory, and database usage
- **Response Times**: Track API response performance
- **Error Rates**: Monitor application errors and crashes
- **Database Performance**: PostgreSQL query performance

### Optimization Strategies

```javascript
// config/database.ts - Production optimizations
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
      },
    },
    pool: {
      min: env.int('DATABASE_POOL_MIN', 2),
      max: env.int('DATABASE_POOL_MAX', 10),
    },
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  },
});
```

## 🔍 Troubleshooting

### Common Issues

**CMS Won't Start**:
```bash
# Check environment variables
echo $DATABASE_URL

# Verify database connection
npm run strapi console

# Check Railway logs
railway logs
```

**API Endpoints Not Working**:
```bash
# Verify content type registration
# Check src/api/[content-type]/content-types/[content-type]/index.js exists
# Ensure schema.json is valid JSON
# Restart the server
```

**Webhook Failures**:
```bash
# Check webhook URL is accessible
curl -X POST $STATIC_SITE_WEBHOOK_URL

# Verify environment variable is set
echo $STATIC_SITE_WEBHOOK_URL

# Check Railway logs for webhook errors
```

### Database Issues

```bash
# Reset database (DESTRUCTIVE)
railway run npm run strapi db:drop
railway run npm run strapi db:migrate

# Backup database
railway run pg_dump $DATABASE_URL > backup.sql

# Restore database
railway run psql $DATABASE_URL < backup.sql
```

## 📚 API Documentation

### Frontend Integration

```typescript
// Frontend API client example
class StrapiAPI {
  private baseURL = 'https://your-railway-url.up.railway.app';
  
  async getProfile() {
    const response = await fetch(`${this.baseURL}/api/profile?populate=*`);
    return response.json();
  }
  
  async getSettings() {
    const response = await fetch(`${this.baseURL}/api/settings?populate=*`);
    return response.json();
  }
  
  async getBioArticles() {
    const response = await fetch(`${this.baseURL}/api/bio-articles?populate=*`);
    return response.json();
  }
}
```

### Error Handling

```typescript
// Robust error handling
async function fetchFromStrapi(endpoint: string) {
  try {
    const response = await fetch(`${STRAPI_URL}/api${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Strapi API error:', error);
    return null; // Graceful fallback
  }
}
```

## 🎯 Recent Updates

### ✅ **Production Deployment** (Completed)

- **Railway Integration**: Full production deployment on Railway
- **PostgreSQL Database**: Automated backups and scaling
- **Environment Management**: Secure configuration handling
- **Webhook Integration**: Automatic site rebuilds on content changes

### ✅ **Content Type Fixes** (Completed)

- **Schema Registration**: Fixed missing index.js files
- **API Endpoints**: Corrected controller/route/service references
- **Lifecycle Hooks**: Implemented proper webhook patterns
- **TypeScript to JavaScript**: Resolved compilation issues

### ✅ **Error Handling** (Completed)

- **Graceful Degradation**: Frontend fallbacks when CMS unavailable
- **Health Checks**: API endpoint monitoring
- **Sample Data**: Fallback content for service continuity

## 🔮 Future Enhancements

### Planned Features

1. **Media Management**: Advanced image processing and CDN integration
2. **Multi-language Support**: Internationalization for global content
3. **Advanced Permissions**: Role-based access control
4. **Content Versioning**: Track and revert content changes
5. **Analytics Integration**: Content performance tracking

### Technical Improvements

- **GraphQL API**: Alternative to REST endpoints
- **Caching Layer**: Redis integration for performance
- **Search Functionality**: Full-text search capabilities
- **Backup Automation**: Automated database backups
- **Monitoring Dashboard**: Custom admin analytics

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- **Strapi Team**: For the powerful headless CMS
- **Railway**: For reliable hosting and deployment
- **PostgreSQL**: For robust database management
- **Open Source Community**: For the tools that make this possible

---

**Built with ❤️ by Tags** | **CMS URL**: https://your-railway-domain.up.railway.app | **Admin**: https://your-railway-domain.up.railway.app/admin

**Updated**: January 2025 | **Status**: Production Ready | **Version**: Strapi 5.18.1
# Trigger deployment
# Force Railway redeployment - 07/21/2025 22:47:19

# Content Types Schema Guide

This document outlines the complete schema for Services and Portfolio content types to be created in Strapi.

## Services Content Type

**Collection Name:** `services`  
**Display Name:** `Service`  
**Draft & Publish:** Enabled

### Fields:

| Field Name | Type | Required | Description | Additional Config |
|------------|------|----------|-------------|-------------------|
| title | Text (Short) | Yes | Service name | |
| slug | UID | Yes | URL-friendly identifier | Target field: title |
| description | Text (Long) | Yes | Service description | |
| category | Text (Short) | No | Service category | e.g., "Leadership", "Development" |
| isPinned | Boolean | Yes | Featured service flag | Default: false |
| featureHighlights | JSON | No | Array of feature strings | |
| tiers | Component | No | Pricing tiers | Repeatable, uses `services.pricing-tier` |
| contactMethod | Enumeration | No | Contact method type | Values: email, calendar, phone, custom |
| customContactLink | Text (Short) | No | Custom contact URL | Only if contactMethod is "custom" |
| order | Number (Integer) | No | Sort order | For manual ordering |
| seoOverride | Component | No | SEO metadata | Uses `shared.seo-data` |

## Portfolio Content Type

**Collection Name:** `portfolios`  
**Display Name:** `Portfolio`  
**Draft & Publish:** Enabled

### Fields:

| Field Name | Type | Required | Description | Additional Config |
|------------|------|----------|-------------|-------------------|
| title | Text (Short) | Yes | Project name | |
| slug | UID | Yes | URL-friendly identifier | Target field: title |
| description | Text (Long) | Yes | Project description | |
| dateCreated | Date | Yes | Project creation date | |
| featured | Boolean | Yes | Featured project flag | Default: false |
| type | Enumeration | Yes | Main category | Values: music, graphic-design, web-development, video, writing, other |
| subtype | Enumeration | Yes | Subcategory | Values: music-video, audio, website, app, logo, apparel, print, other |
| featuredImage | Media | No | Main project image | Single, Images only |
| gallery | Media | No | Additional images | Multiple, Images only |
| embedCode | Text (Long) | No | YouTube/Vimeo embed code | |
| externalLink | Text (Short) | No | Off-site project URL | |
| linkButtonText | Text (Short) | No | CTA button text | Default: "See it" |
| technologies | JSON | No | Array of tech used | |
| role | Text (Short) | No | Your role in project | |
| client | Text (Short) | No | Client name | |
| collaborators | Component | No | Project collaborators | Repeatable, uses `portfolio.collaborator` |
| testimonial | Component | No | Client testimonial | Single, uses `portfolio.testimonial` |
| order | Number (Integer) | No | Sort order | For manual ordering |
| seoOverride | Component | No | SEO metadata | Uses `shared.seo-data` |

## Component Schemas

### 1. `services.pricing-tier` Component
- **name** (Text, required) - Tier name
- **priceLow** (Decimal) - Starting price
- **priceHigh** (Decimal) - Ending price
- **deliverables** (JSON) - Array of included items
- **description** (Text Long) - Additional description
- **recommended** (Boolean) - Mark as recommended

### 2. `portfolio.collaborator` Component
- **name** (Text, required) - Collaborator name
- **role** (Text) - Their project role
- **url** (Text) - Profile/GitHub link
- **avatar** (Media) - Profile image

### 3. `portfolio.testimonial` Component
- **quote** (Text Long, required) - Testimonial text
- **author** (Text, required) - Author name
- **authorTitle** (Text) - Job title
- **company** (Text) - Company name
- **rating** (Integer, 1-5) - Star rating

## API Configuration

After creating these content types, configure the following permissions:

### Public API Access:
- Services: find, findOne
- Portfolio: find, findOne

### Authenticated API Access:
- All CRUD operations for both content types

## Notes:

1. The components have already been created in:
   - `/src/components/services/pricing-tier.json`
   - `/src/components/portfolio/collaborator.json`
   - `/src/components/portfolio/testimonial.json`

2. When creating enumerations in Strapi Admin, ensure to add all the values listed above.

3. For the JSON fields (featureHighlights, deliverables, technologies), you can alternatively use a Text field with proper parsing in your frontend code.

4. Remember to restart Strapi after creating new content types and components. 
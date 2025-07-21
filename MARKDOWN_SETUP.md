# Markdown Setup for Strapi Bio Articles

## Current Setup
The Bio Article content field is currently set to `richtext`, which provides a WYSIWYG editor and outputs HTML.

## To Enable Markdown Support

### Option 1: Use Markdown Field (Recommended)
Change the content field type to support markdown:

1. **Update the schema** in `/src/api/bio-article/content-types/bio-article/schema.json`:
```json
"content": {
  "type": "blocks",
  "required": true
}
```

The `blocks` field type in Strapi v5 supports markdown blocks natively.

2. **Install markdown renderer** in your frontend:
```bash
npm install marked
# or
npm install remark remark-html
```

3. **Update frontend rendering**:
```typescript
import { marked } from 'marked';

// In your content processing
const htmlContent = marked(mergedData.content);
```

### Option 2: Keep Rich Text but Add Markdown Support
If you want to keep the rich text editor but also support markdown:

1. Add a new field for markdown content:
```json
"contentMarkdown": {
  "type": "text",
  "required": false,
  "description": "Alternative markdown content"
}
```

2. Use conditional rendering on the frontend based on which field has content.

### Option 3: Use Custom Field Plugin
Install a markdown editor plugin for Strapi that provides a better markdown editing experience.

## Frontend Rendering
Currently, the bio page renders content like this:
```astro
{contentHtml ? <div set:html={contentHtml} /> : <Content />}
```

This works for HTML content. For markdown, you'd need to process it first before rendering. 
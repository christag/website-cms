/**
 * Lifecycle hooks for author-profile content type
 * Triggers webhooks to rebuild the static site when content changes
 */

export default {
  async afterCreate(event: any) {
    await triggerWebhook('entry.create', 'author-profile', event.result);
  },

  async afterUpdate(event: any) {
    await triggerWebhook('entry.update', 'author-profile', event.result);
    
    // Handle publish/unpublish within afterUpdate
    if (event.result.publishedAt && !event.params.data.publishedAt) {
      await triggerWebhook('entry.publish', 'author-profile', event.result);
    } else if (!event.result.publishedAt && event.params.data.publishedAt) {
      await triggerWebhook('entry.unpublish', 'author-profile', event.result);
    }
  },

  async afterDelete(event: any) {
    await triggerWebhook('entry.delete', 'author-profile', event.result);
  },
};

/**
 * Trigger webhook to rebuild static site
 */
async function triggerWebhook(eventType: string, model: string, entry: any) {
  const webhookUrl = process.env.STATIC_SITE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('STATIC_SITE_WEBHOOK_URL not configured, skipping webhook');
    return;
  }

  const payload = {
    event: eventType,
    model,
    entry: {
      id: entry.id,
      documentId: entry.documentId,
      publishedAt: entry.publishedAt,
    },
    createdAt: new Date().toISOString(),
  };

  try {
    console.log(`Triggering webhook for ${eventType} on ${model}:${entry.id}`);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Strapi-Webhook/1.0',
        // Add authentication header if secret is configured
        ...(process.env.STRAPI_WEBHOOK_SECRET && {
          'x-strapi-signature': process.env.STRAPI_WEBHOOK_SECRET,
        }),
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`Webhook triggered successfully for ${eventType}`);
    } else {
      console.error(`Webhook failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
  }
} 
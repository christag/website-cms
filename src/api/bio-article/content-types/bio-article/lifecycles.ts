/**
 * Lifecycle hooks for bio-article content type
 * Triggers webhooks to rebuild the static site when content changes
 */

export default {
  async afterCreate(event: any) {
    await triggerWebhook('entry.create', 'bio-article', event.result);
  },

  async afterUpdate(event: any) {
    await triggerWebhook('entry.update', 'bio-article', event.result);
  },

  async afterDelete(event: any) {
    await triggerWebhook('entry.delete', 'bio-article', event.result);
  },

  async afterPublish(event: any) {
    await triggerWebhook('entry.publish', 'bio-article', event.result);
  },

  async afterUnpublish(event: any) {
    await triggerWebhook('entry.unpublish', 'bio-article', event.result);
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
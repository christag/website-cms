'use strict';

/**
 * settings service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::settings.settings'); 
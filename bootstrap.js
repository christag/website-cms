/**
 * Bootstrap script to ensure content types are registered with Users & Permissions plugin
 * This fixes the issue where content types don't appear in the Users & Permissions roles
 */

module.exports = async ({ strapi }) => {
  console.log('🔧 Bootstrap: Ensuring Users & Permissions plugin recognizes content types...');

  try {
    // Wait for plugins to be loaded
    await strapi.plugin('users-permissions').service('users-permissions').initialize();
    
    // Force refresh of the Users & Permissions plugin permissions
    const contentTypes = [
      'api::service.service',
      'api::bio-article.bio-article', 
      'api::profile.profile',
      'api::settings.settings'
    ];

    // Check if content types are registered
    for (const uid of contentTypes) {
      const contentType = strapi.contentTypes[uid];
      if (contentType) {
        console.log(`✅ Content type found: ${uid}`);
      } else {
        console.log(`❌ Content type missing: ${uid}`);
      }
    }

    // Force Users & Permissions to refresh its route map
    if (strapi.plugin('users-permissions')) {
      const usersPermissionsService = strapi.plugin('users-permissions').service('users-permissions');
      
      // This forces the plugin to re-scan for content types and routes
      await usersPermissionsService.syncPermissions();
      console.log('🔄 Users & Permissions plugin permissions synced');
    }

    console.log('✅ Bootstrap complete - content types should now appear in Users & Permissions');

  } catch (error) {
    console.error('❌ Bootstrap error:', error.message);
    // Don't throw - let Strapi continue starting up
  }
}; 
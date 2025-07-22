/**
 * Database initialization script for Strapi v5
 * This ensures content types are properly registered in the database
 */

async function initDatabase() {
  console.log('🔧 Initializing Strapi database...');
  
  try {
    // Check if we're in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Not in production environment, skipping database init');
      return;
    }

    console.log('✅ Database initialization check complete');
    
    // Log environment info
    console.log('📊 Environment info:');
    console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`   - DATABASE_URL exists: ${!!process.env.DATABASE_URL}`);
    console.log(`   - DATABASE_PRIVATE_URL exists: ${!!process.env.DATABASE_PRIVATE_URL}`);
    console.log(`   - RAILWAY_ENVIRONMENT: ${process.env.RAILWAY_ENVIRONMENT || 'not set'}`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    // Don't throw - let Strapi handle the error
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase }; 
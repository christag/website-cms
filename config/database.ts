import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  // Debug logging for Railway
  if (process.env.NODE_ENV === 'production') {
    console.log('Database configuration debug:');
    console.log('CLIENT:', client);
    console.log('DATABASE_URL exists:', !!env('DATABASE_URL'));
    console.log('DATABASE_PRIVATE_URL exists:', !!env('DATABASE_PRIVATE_URL'));
    console.log('DATABASE_HOST:', env('DATABASE_HOST', 'not-set'));
    console.log('DATABASE_PORT:', env('DATABASE_PORT', 'not-set'));
    console.log('DATABASE_NAME:', env('DATABASE_NAME', 'not-set'));
  }

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        // Prioritize DATABASE_PRIVATE_URL for Railway private networking to avoid egress fees
        // Fall back to DATABASE_URL (public) if private URL not available
        ...(env('DATABASE_PRIVATE_URL') ? {
          connectionString: env('DATABASE_PRIVATE_URL'),
        } : env('DATABASE_URL') ? {
          connectionString: env('DATABASE_URL'),
        } : {
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'railway'),
          user: env('DATABASE_USERNAME', 'postgres'),
          password: env('DATABASE_PASSWORD'),
        }),
        ssl: env.bool('DATABASE_SSL', false) ? {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        } : false,
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10),
        acquireTimeoutMillis: env.int('DATABASE_POOL_ACQUIRE_TIMEOUT', 60000),
        createTimeoutMillis: env.int('DATABASE_POOL_CREATE_TIMEOUT', 30000),
        destroyTimeoutMillis: env.int('DATABASE_POOL_DESTROY_TIMEOUT', 5000),
        idleTimeoutMillis: env.int('DATABASE_POOL_IDLE_TIMEOUT', 30000),
        reapIntervalMillis: env.int('DATABASE_POOL_REAP_INTERVAL', 1000),
        createRetryIntervalMillis: env.int('DATABASE_POOL_CREATE_RETRY_INTERVAL', 200),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};


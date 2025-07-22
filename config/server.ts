export default ({ env }) => ({
  // Use :: for IPv6 binding on Railway private networking
  // Falls back to 0.0.0.0 for local development
  host: env('HOST', process.env.RAILWAY_ENVIRONMENT ? '::' : '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

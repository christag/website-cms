export default ({ env }) => ({
  // Temporarily revert to 0.0.0.0 until private networking is properly configured
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

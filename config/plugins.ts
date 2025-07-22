export default ({ env }) => ({
  // Users & Permissions plugin configuration
  'users-permissions': {
    enabled: true,
    config: {
      jwt: {
        expiresIn: '30d',
      },
      // Ensure content types are registered
      register: {
        allowedFields: [],
      },
    },
  },
});

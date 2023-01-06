module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', 'db'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'workshop'),
        username: env('DATABASE_USERNAME', 'workshop'),
        password: env('DATABASE_PASSWORD', 'workshop'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});

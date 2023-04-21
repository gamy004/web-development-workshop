module.exports = ({ env }) => ({
  defaultConnection: env("TEST_DATABASE_CONNECTION", "default"),
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
        filename: ".tmp/data.db",
      },
      options: {
        useNullAsDefault: true,
        pool: {
          min: 0,
          max: 1,
        },
      },
    },

    local: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("TEST_DATABASE_HOST"),
        port: env("TEST_DATABASE_PORT", 3306),
        database: env("TEST_DATABASE_NAME"),
        username: env("TEST_DATABASE_USERNAME"),
        password: env("TEST_DATABASE_PASSWORD"),
        migrations: {
          tableName: "migrations",
        },
      },
      options: {
        debug: false,
        useNullAsDefault: true,
      },
    },
  },
});

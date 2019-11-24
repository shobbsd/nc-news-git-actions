const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news'
    }
  },
  test: {
    connection: process.env.DATABASE_URL || {
      database: 'nc_news_test'
      // password
    }
  },
  production: {
    connection: process.env.DATABASE_URL
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

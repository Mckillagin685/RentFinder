'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/rent_finder_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/rent_finder_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

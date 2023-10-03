const config = require('config');

const DB_CONFIG = {
  DATABASE_URL: config.get('DATABASE_URL'),
}

module.exports = DB_CONFIG;
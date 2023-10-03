
const promise = require('bluebird');
const { DB_CONFIG } = require('./config');

const initOptions = {
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

const db = pgp({
  connectionString: DB_CONFIG.DATABASE_URL,
  allowExitOnIdle: true
});


module.exports = db;
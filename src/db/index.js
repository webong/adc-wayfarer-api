const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPASSWORD,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

/**
 * DB Query
 * @param {string} text
 * @param {Array} params
 * @returns {object} object
 */
// eslint-disable-next-line arrow-body-style
const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * DB Query
 * @param {string} text
 * @returns void
 */
// eslint-disable-next-line arrow-body-style
const queryText = (text) => {
  pool.query(text)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  pool,
  query,
  queryText,
};

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PASSWORD,
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
const raw = (text) => {
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

export default {
  raw,
  query,
  pool,
};

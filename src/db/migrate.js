import db from './index';

db.pool.on('connect', () => {
  console.log('connected to the db');
});

module.exports.createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          email VARCHAR(128) UNIQUE NOT NULL,
          first_name VARCHAR(128) NOT NULL,
          last_name VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          is_admin BOOLEAN,
          created_date TIMESTAMP,
          modified_date TIMESTAMP
        )`;

  db.raw(queryText);
};

/**
 * Drop User Table
 */
module.exports.dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  db.raw(queryText);
};

module.exports.createTables = () => {
};

db.pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

require('make-runnable');

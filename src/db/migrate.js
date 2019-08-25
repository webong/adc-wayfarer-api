const { pool, queryText } = require('./index');

pool.on('connect', () => {
  console.log('connected to the db');
});

module.exports.createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS
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

  queryText(query);
};

/**
 * Drop User Table
 */
module.exports.dropUserTable = () => {
  const query = 'DROP TABLE IF EXISTS users returning *';
  queryText(query);
};

/**
 * Create All Tables
 */
module.exports.createAllTables = () => {
  this.createUserTable();
};

/**
 * Drop All Tables
 */
module.exports.dropAllTables = () => {
  this.dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

require('make-runnable');

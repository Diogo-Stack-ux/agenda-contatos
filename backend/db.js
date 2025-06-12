const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'agenda',
  password: 'diogo9121',
  port: 5432,
});

module.exports = pool;

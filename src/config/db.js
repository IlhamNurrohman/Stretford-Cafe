const psql = require("pg");
const { Pool } = psql;

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;

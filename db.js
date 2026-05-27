const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const {
  DB_HOST,
  DB_PORT = 5432,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error("Missing database configuration in .env file");
}

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = { pool };

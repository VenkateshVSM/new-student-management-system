require('dotenv').config();

const mysql = require('mysql2/promise');
const { URL } = require('url');

function buildDbConfig() {
  if (process.env.DATABASE_URL) {
    try {
      const parsed = new URL(process.env.DATABASE_URL);
      const config = {
        host: parsed.hostname,
        port: parsed.port ? Number(parsed.port) : 3306,
        user: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: parsed.pathname.replace(/^\/+/, '')
      };

      const sslmode = parsed.searchParams.get('sslmode');
      if (sslmode === 'require' || sslmode === 'verify-ca' || sslmode === 'verify-full') {
        config.ssl = { rejectUnauthorized: false };
      }

      return config;
    } catch (error) {
      console.warn('DATABASE_URL parse failed, falling back to DB_* values:', error.message);
    }
  }

  return {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_management'
  };
}

const pool = mysql.createPool(buildDbConfig());

module.exports = pool;
module.exports.buildDbConfig = buildDbConfig;


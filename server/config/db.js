require('dotenv').config();

const mysql = require('mysql2/promise');
const { URL } = require('url');

function buildDbConfig() {
  if (process.env.DATABASE_URL) {
    try {
      const parsedUrl = new URL(process.env.DATABASE_URL);
      const config = {
        host: parsedUrl.hostname,
        port: parsedUrl.port ? Number(parsedUrl.port) : 3306,
        user: decodeURIComponent(parsedUrl.username),
        password: decodeURIComponent(parsedUrl.password),
        database: parsedUrl.pathname.replace(/^\/+/, '')
      };

      const sslMode = parsedUrl.searchParams.get('sslmode');
      if (sslMode === 'require' || sslMode === 'verify-ca' || sslMode === 'verify-full') {
        config.ssl = { rejectUnauthorized: false };
      }

      return config;
    } catch (error) {
      console.warn('Unable to parse DATABASE_URL, falling back to DB_* env vars.', error.message);
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


require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  API_KEY:process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  GM_PASSWORD:process.env.GM_PASSWORD,
  GM_CORREO:process.env.GM_CORREO,
};

module.exports = { config };

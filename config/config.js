require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  
  DATABASE_URL:process.env.DATABASE_URL,
  isprod: process.env.isprod,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
  PGUSER: process.env.PGUSER
};

module.exports = { config };

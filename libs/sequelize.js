const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models/index');

let URI =''
if (config.isprod=="production"){
  const USER = encodeURIComponent(config.PGUSER);
  const PASSWORD = encodeURIComponent(config.PGPASSWORD);
   URI = `postgres://${USER}:${PASSWORD}@${config.PGHOST}:${config.PGPORT}/${config.PGDATABASE}`;

}else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
   URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;

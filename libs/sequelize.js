const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models/index');

let URI =''

if (config.isprod){
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
   URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

}else{
    URI = config.DATABASE_URL
}

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);


module.exports = sequelize;

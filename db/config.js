const { config } = require('./../config/config');

let URI =''
if (config.isProd){
  const USER = encodeURIComponent(config.PGUSER);
  const PASSWORD = encodeURIComponent(config.PGPASSWORD);
   URI = `postgres://${USER}:${PASSWORD}@${config.PGHOST}:${config.PGPORT}/${config.PGDATABASE}`;

}else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
   URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}
 

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};

const express = require('express');
const usersRouter = require('./users.router');
const personRouter = require('./person.router')
const petsRouter = require('./pets.router')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/persons',personRouter);
  router.use('/pets',petsRouter);

}
module.exports = routerApi;

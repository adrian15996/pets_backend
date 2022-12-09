const express = require('express');
const usersRouter = require('./users.router');
const personRouter = require('./person.router');
const petsRouter = require('./pets.router');
const authRouter = require('./auth.router');
const administratorRouter = require('./administrator.router');
const posterRouter = require('./poster.router');
const categoryRouter = require('./category.router');
const postRouter = require('./post.router');
const VeterinaryRouter = require('./veterinary.router');
const VaccineRouter = require('./vaccine.router');
const NotificationRouter = require('./notification.router');




function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/persons', personRouter);
  router.use('/pets', petsRouter);
  router.use('/auth', authRouter);
  router.use('/administrator', administratorRouter);
  router.use('/poster', posterRouter);
  router.use('/category', categoryRouter);
  router.use('/post', postRouter);
  router.use('/veterinary', VeterinaryRouter);
  router.use('/vaccine', VaccineRouter);
  router.use('/notification', NotificationRouter);


}
module.exports = routerApi;

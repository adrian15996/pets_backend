const express = require('express');
const passport = require('passport');
const router = express.Router();
const posterService = require('../services/poster.service');
const service = new posterService();
const personService = require('../services/person.service');
const servicePerson = new personService();
const { checkRoles } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  getPosterSchema,
  updatePosterSchema,
  createPosterSchema,
} = require('../schema/poster.schema');

router.get(
  '/own',
  validatorHandler(getPosterSchema, 'params'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador','poster' ),
  async (req, res) => {
    const id =req.user.sub;
    const response = await service.findOne(id);
    res.status(200).json({
      response,
    });
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador', ),
  async (req, res, next) => {
    try {
      const users = await service.find(req.user.sub);

      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createPosterSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.create(body);
      res.status(201).json({
        message: 'Poster was created',
        rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador','poster'),
  validatorHandler(updatePosterSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const body = req.body;
      console.log(req.user.sub)
      const rta2 = await servicePerson.update(id, body.person);
      const rta = await service.update(rta2.dataValues.poster.id, body);
      delete rta2.dataValues.password;
      res.json({
        message: 'Updated',
        rta2,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador','poster'),
  validatorHandler(getPosterSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

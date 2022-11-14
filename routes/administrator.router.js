const express = require('express');
const passport = require('passport');
const router = express.Router();
const administratorService = require('../services/administrator.service');
const service = new administratorService();
const personService = require('../services/person.service');
const servicePerson = new personService();
const { checkRoles } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  getAdministratorSchema,
  updateAdministratorSchema,
  createAdministratorSchema,
} = require('../schema/administrator.schema');

router.get(
  '/:id',
  validatorHandler(getAdministratorSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.status(200).json({
      response,
    });
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador'),
  async (req, res, next) => {
    try {
      const admin = await service.find();
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createAdministratorSchema, 'body'),
  checkRoles('administrador'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.create(body);
      res.status(201).json({
        message: 'Admin was created',
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
  checkRoles('administrador'),
  validatorHandler(updateAdministratorSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const body = req.body;
      console.log(id);
      const rta2 = await servicePerson.update(id, body.person);
      const rta = await service.update(rta2.dataValues.admin.id, body);
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
  checkRoles('administrador'),
  validatorHandler(getAdministratorSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

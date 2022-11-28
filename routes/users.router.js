const express = require('express');
const passport = require('passport');
const router = express.Router();
const userService = require('../services/users.service');
const service = new userService();
const personService = require('../services/person.service');
const servicePerson = new personService();
const { checkRoles } = require('../middlewares/auth.handler');
const cloud = require('../utils/cloudinary/');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const validatorHandler = require('../middlewares/validator.handler');
const {
  getUserSchema,
  updateUserSchema,
  createUserSchema,
} = require('../schema/user.schema');

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
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
  checkRoles('administrador', 'user'),
  async (req, res, next) => {
    try {
      console.log(req.user);
      const users = await service.findOne(req.user.sub);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.create(body);
      res.status(201).json({
        message: 'User was created',
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
  checkRoles('admin', 'user'),
  validatorHandler(updateUserSchema, 'body'),upload.single('thumbnail'),
  async (req, res, next) => {
    try {
      const id = req.user.sub;
      const body = req.body;
      const file = req.file
      if (file) {
        const { secure_url, public_id } = await cloud.uploader.upload(
          file.path
        );

        body.foto = secure_url;
      }
      const rta = await service.update(id, body);
      const rta2 = await servicePerson.update(rta.personId, body.person);
      delete rta2.dataValues.password;
      res.json({
        message: 'Updated',
        rta,
        rta2,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

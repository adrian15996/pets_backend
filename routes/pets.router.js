const express = require('express');
const router = express.Router();
const passport = require('passport');
const petsService = require('../services/pets.service');
const service = new petsService();
const { checkRoles } = require('../middlewares/auth.handler');
const cloud = require('../utils/cloudinary/');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const validatorHandler = require('../middlewares/validator.handler');
const {
  createPetSchema,
  updatePetSchema,
  getPetSchema,
} = require('../schema/pets.schema');

router.get(
  '/:idPets',
  validatorHandler(getPetSchema, 'params'),
  async (req, res, next) => {
    try {
      const { idPets } = req.params;
      const response = await service.findOne(idPets);
      res.status(200).json({
        response,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  async (req, res, next) => {
    try {
      const pets = await service.find(req.user.sub);
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(createPetSchema, 'body'),

  async (req, res, next) => {
    try {
      const body = req.body;
      body.userId = req.user.sub;
      const rta = await service.create(body);
      res.status(201).json({
        message: 'pet was created',
        rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:idPets',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getPetSchema, 'params'),
  validatorHandler(updatePetSchema, 'body'),
  upload.single('thumbnail'),
  async (req, res, next) => {
    try {
      const { idPets } = req.params;
      const body = req.body;
      const file = req.file;
      if (file) {
        const { secure_url, public_id } = await cloud.uploader.upload(
          file.path
        );
        body.foto = secure_url;
      }
      const rta = await service.update(idPets, body);
      res.json({
        message: 'Updated',
        data: rta,
        idPets,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:idPets',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getPetSchema, 'params'),
  async (req, res) => {
    try {
      const { idPets } = req.params;
      const message = await service.delete(idPets);
      res.status(200).json({
        message,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

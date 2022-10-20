const express = require('express');
const router = express.Router();
const petsService = require('../services/pets.service');
const service = new petsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createPetSchema,
  updatePetSchema,
  getPetSchema,
} = require('../schema/pets.schema');

router.get(
  '/:idPets',
  validatorHandler(getPetSchema, 'params'),
  async (req, res) => {
    const {idPets } = req.params;
    const response = await service.findOne(idPets);
    res.status(200).json({
      response,
    });
  }
);

router.get('/', async (req, res) => {
  const pets = await service.find();
  res.json(pets);
});

router.post(
  '/',
  validatorHandler(createPetSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.create(body);
    res.status(201).json({
      message: 'pet was created',
      rta,
    });
  }
);

router.put(
  '/:idPets',
  validatorHandler(getPetSchema, 'params'),
  validatorHandler(updatePetSchema, 'body'),
  async (req, res) => {
    const { idPets } = req.params;
    const body = req.body;
    const rta = await service.update(idPets, body);
    res.json({
      message: 'Updated',
      data: rta,
      idPets,
    });
  }
);

router.delete(
  '/:idPets',
  validatorHandler(getPetSchema, 'params'),
  async (req, res) => {
    const { idPets } = req.params;
    const message = await service.delete(idPets);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

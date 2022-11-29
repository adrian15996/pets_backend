const express = require('express');
const router = express.Router();
const veterinaryService = require('../services/veterinary.service');
const service = new veterinaryService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  getVeterinarySchema,
  updateVeterinarySchema,
  createVeterinarySchema,
} = require('../schema/veterinary.schema');

router.get(
  '/:id',
  validatorHandler(getVeterinarySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.status(200).json({
      response,
    });
  }
);

router.get('/', async (req, res) => {
  const persons = await service.find();
  res.json(persons);
});

router.post(
  '/',
  validatorHandler(createVeterinarySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.create(body);
    res.status(201).json({
      message: 'veterinary was created',
      rta,
    });
  }
);

router.put(
  '/:id',
  validatorHandler(getVeterinarySchema, 'params'),
  validatorHandler(updateVeterinarySchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const rta = await service.update(id, body);
    res.json({
      message: 'Updated',
      data: rta,
      id,
    });
  }
);

router.delete(
  '/:id',
  validatorHandler(getVeterinarySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

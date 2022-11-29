const express = require('express');
const router = express.Router();
const vaccineService = require('../services/vaccine.service');
const service = new vaccineService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  getVaccineSchema,
  updateVaccineSchema,
  createVaccineSchema,
} = require('../schema/vaccine.schema');

router.get(
  '/:id',
  validatorHandler(getVaccineSchema, 'params'),
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
  validatorHandler(createVaccineSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.create(body);
    res.status(201).json({
      message: 'Person was created',
      rta,
    });
  }
);

router.put(
  '/:id',
  validatorHandler(getVaccineSchema, 'params'),
  validatorHandler(updateVaccineSchema, 'body'),
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
  validatorHandler(getVaccineSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

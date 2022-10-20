const express = require('express');
const router = express.Router();
const personService = require('../services/person.service');
const service = new personService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  getPersonSchema,
  updatePersonSchema,
  createPersonSchema,
} = require('../schema/person.schema');

router.get(
  '/:id',
  validatorHandler(getPersonSchema, 'params'),
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
  validatorHandler(createPersonSchema, 'body'),
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
  validatorHandler(getPersonSchema, 'params'),
  validatorHandler(updatePersonSchema, 'body'),
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
  validatorHandler(getPersonSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

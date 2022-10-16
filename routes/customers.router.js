const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('../schema/customer.schema');

const service = new CustomerService();
router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.status(200).json({
      response,
    });
  }
);

router.get('/', async (req, res) => {
  const rta = await service.find();
  res.json(rta);
});

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.create(body);
    res.status(201).json({
      message: 'User was created',
      rta,
    });
  }
);

router.put(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
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
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

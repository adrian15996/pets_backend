const express = require('express');
const router = express.Router();
const CustomerService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schema/order.schema');

const service = new CustomerService();

router.post(
  '/addItem',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.addItem(body);
    res.status(201).json({
      rta,
    });
  }
);

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
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
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const rta = await service.create(body);
    res.status(201).json({
      message: 'Order was created',
      rta,
    });
  }
);

router.put(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(createOrderSchema, 'body'),
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
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

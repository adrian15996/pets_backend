const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');
const service = new userService();

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

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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

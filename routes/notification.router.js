const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const NotificationService = require('./../services/notification.service');
const {
  getNotificationSchema,
  updateNotificationSchema,
  createNotificationSchema,
} = require('../schema/notification.schema');
const router = express.Router();
const service = new NotificationService();

// router.post(
//   '/',
//   async (req, res, next) => {
//     try {
//       const { message } = req.body;
//       res.json(service.notification(message));
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.get(
  '/:id',
  validatorHandler(getNotificationSchema, 'params'),
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
  validatorHandler(createNotificationSchema, 'body'),
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
  validatorHandler(getNotificationSchema, 'params'),
  validatorHandler(updateNotificationSchema, 'body'),
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
  validatorHandler(getNotificationSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);
module.exports = router;

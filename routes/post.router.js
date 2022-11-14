const express = require('express');
const passport = require('passport');
const router = express.Router();
const PostService = require('../services/post.service');
const service = new PostService();
const { checkRoles } = require('../middlewares/auth.handler');

const validatorHandler = require('../middlewares/validator.handler');
const {
  getPostSchema,
  updatePostSchema,
  createPostSchema,
} = require('../schema/post.schema');

router.get(
  '/:id',
  validatorHandler(getPostSchema, 'params'),
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
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createPostSchema, 'body'),
  checkRoles('administrador','poster'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.create(body);
      res.status(201).json({
        message: 'category was created',
        rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador', 'poster'),
  validatorHandler(getPostSchema, 'params'),
  validatorHandler(updatePostSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const rta = await service.update(id, body);
      res.json({
        message: 'Updated',
        rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  checkRoles('administrador','poster'),
  validatorHandler(getPostSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const message = await service.delete(id);
    res.status(200).json({
      message,
    });
  }
);

module.exports = router;

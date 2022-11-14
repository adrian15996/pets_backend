const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const person = req.user.dataValues;
      const role =req.user.dataValues.user || req.user.dataValues.admin || req.user.dataValues.poster;
      const payload = {
        sub: person.id,
        role: role.role,
      };
      const token = jwt.sign(payload, config.JWT_SECRET);
      res.json({ person, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

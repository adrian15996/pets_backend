const joi = require('joi');

const id = joi.string();
const email = joi.string().email();
const password = joi.string().min(6).max(20);
const role = joi.string().min(8);

const createUserSchema = joi.object({
  id: id,
  email: email.required(),
  password: password.required(),
  role: role,
});

const updateUserSchema = joi.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { getUserSchema, updateUserSchema, createUserSchema };

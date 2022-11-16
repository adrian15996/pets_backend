const joi = require('joi');

const id = joi.string();
const name = joi.string();
const gender = joi.string();
const email = joi.string().email();
const phone = joi.string();
const aboutMe = joi.string();
const password = joi.string().min(6).max(20);

const createUserSchema = joi.object({
  id: id,
  aboutMe,
  person:{
    name:name.required(),
    gender,
    email:email.required(),
    phone,
    password:password.required(),
  },
});

const updateUserSchema = joi.object({
  aboutMe,
  person: {
    name,
    gender,
    email,
    phone,
    password,
  }
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { getUserSchema, updateUserSchema, createUserSchema };

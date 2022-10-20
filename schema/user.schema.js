const joi = require('joi');

const id = joi.string();
const name = joi.string();
const gender = joi.string();
const email = joi.string().email();
const phone = joi.string();
const aboutMe = joi.string();
const password = joi.string().min(6).max(20);
const personId = joi.number().integer();

const createUserSchema = joi.object({
  id: id,
  aboutMe,
  person:{
    name:name.required(),
    gender:gender.required(),
    email:email.required(),
    phone:phone.required(),
    password:password.required(),
  },
});

const updateUserSchema = joi.object({
  id: id,
  name:name,
  gender:gender,
  email: email,
  phone:phone,
  password: password,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { getUserSchema, updateUserSchema, createUserSchema };

const joi = require('joi');

const id = joi.string();
const name = joi.string();
const gender = joi.string();
const email = joi.string().email();
const phone = joi.string();
const password = joi.string().min(6).max(20);

const createPersonSchema = joi.object({
    name:name.required(),
    gender:gender.required(),
    email:email.required(),
    phone:phone.required(),
    password:password.required(),
});

const updatePersonSchema = joi.object({
    name:name,
    gender:gender,
    email:email,
    phone:phone,
    password:password,
});

const getPersonSchema = joi.object({
  id: id.required(),
});

module.exports = { getPersonSchema, updatePersonSchema, createPersonSchema };

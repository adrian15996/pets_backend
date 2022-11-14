const joi = require('joi');

const id = joi.string();
const name = joi.string();
const gender = joi.string();
const email = joi.string().email();
const phone = joi.string();
const password = joi.string().min(6).max(20);
const foto = joi.binary();
const createAdministratorSchema = joi.object({
  id: id,
  person:{
    name:name.required(),
    gender:gender.required(),
    email:email.required(),
    phone:phone.required(),
    password:password.required(),
  },
});

const updateAdministratorSchema = joi.object({
    foto,
  person: {
    name,
    gender,
    email,
    phone,
    password,
  }
});

const getAdministratorSchema = joi.object({
  id: id.required(),
});

module.exports = { getAdministratorSchema, updateAdministratorSchema, createAdministratorSchema };

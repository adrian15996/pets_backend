const joi = require('joi');

const id = joi.string();
const name = joi.string();
const gender = joi.string();
const email = joi.string().email();
const phone = joi.string();
const password = joi.string().min(6).max(20);
const foto = joi.binary();

const createPosterSchema = joi.object({
  id: id,
  foto,
  person:{
    name:name.required(),
    gender:gender.required(),
    email:email.required(),
    phone:phone.required(),
    password:password.required(),
  },
});

const updatePosterSchema = joi.object({
    foto,
  person: {
    name,
    gender,
    email,
    phone,
    password,
  }
});

const getPosterSchema = joi.object({
  id: id.required(),
});

module.exports = { getPosterSchema, updatePosterSchema, createPosterSchema };

const joi = require('joi');

const idPets = joi.number().integer();
const name = joi.string();
const gender = joi.string();
const breed = joi.string();
const size = joi.string();
const dateOfBirth = joi.date();
const userId = joi.number().integer();

const createPetSchema = joi.object({
  name: name.required(),
  gender: gender.required(),
  breed: breed.required(),
  size: size.required(),
  dateOfBirth: dateOfBirth.required(),
});

const updatePetSchema = joi.object({
  name: name,
  gender: gender,
  breed: breed,
  size: size,
  dateOfBirth: dateOfBirth,
});

const getPetSchema = joi.object({
  idPets: idPets.required(),
});

module.exports = { createPetSchema, updatePetSchema, getPetSchema };

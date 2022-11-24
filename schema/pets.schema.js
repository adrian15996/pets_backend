const joi = require('joi');

const idPets = joi.number().integer();
const name = joi.string();
const gender = joi.string();
const breed = joi.string();
const size = joi.string();
const dateOfBirth = joi.date();
const idBreed = joi.string();

const createPetSchema = joi.object({
  name: name.required(),
  gender: gender.required(),
  breed: breed.required(),
  size: size.required(),
  dateOfBirth: dateOfBirth.required(),
  idBreed:idBreed.required()
});

const updatePetSchema = joi.object({
  name: name,
  gender: gender,
  breed: breed,
  size: size,
  dateOfBirth: dateOfBirth,
  idBreed
});

const getPetSchema = joi.object({
  idPets: idPets.required(),
});

module.exports = { createPetSchema, updatePetSchema, getPetSchema };

const joi = require('joi');

const id = joi.string();
const date = joi.string();
const name = joi.string();
const tag = joi.string();
const nextVaccine = joi.string();
const firma = joi.string();
const petId = joi.number().integer();
const veterinaryId = joi.number().integer();

const createVaccineSchema = joi.object({
  name: name.required(),
  date: date.required(),
  tag: tag.required(),
  nextVaccine,
  firma,
  petId: petId.required(),
  veterinaryId: veterinaryId.required(),
});

const updateVaccineSchema = joi.object({
  name: name.required(),
  date: date.required(),
  tag: tag.required(),
  nextVaccine,
  firma,
  petId: petId.required(),
  veterinaryId: veterinaryId.required(),
});

const getVaccineSchema = joi.object({
  id: id.required(),
});

module.exports = {
  getVaccineSchema,
  updateVaccineSchema,
  createVaccineSchema,
};

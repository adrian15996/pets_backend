const joi = require('joi');

const id = joi.string();
const name = joi.string();
const direccion = joi.string();
const email = joi.string().email();
const petId = joi.number().integer();
const cedulaProfesional = joi.string();
const phone = joi.string();



const createVeterinarySchema = joi.object({
    name:name.required(),
    direccion,
    email,
    petId:petId.required(),
    cedulaProfesional,
    phone
});

const updateVeterinarySchema = joi.object({
    name,
    direccion,
    email,
    petId,
    cedulaProfesional,
    phone
});

const getVeterinarySchema = joi.object({
  id: id.required(),
});

module.exports = { getVeterinarySchema, updateVeterinarySchema, createVeterinarySchema };

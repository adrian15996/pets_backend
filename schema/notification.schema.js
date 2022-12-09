const joi = require('joi');

const id = joi.string();
const titulo = joi.string();
const mensaje = joi.string();
const identificador = joi.string();
const petId = joi.number().integer();
const dateHour = joi.string();

const createNotificationSchema = joi.object({
  titulo: titulo.required(),
  mensaje: mensaje.required(),
  identificador: identificador.required(),
  petId: petId.required(),
  dateHour: dateHour.required(),
});

const updateNotificationSchema = joi.object({
  titulo,
  mensaje,
  identificador,
  petId,
  dateHour,
});

const getNotificationSchema = joi.object({
  id: id.required(),
});

module.exports = {
  getNotificationSchema,
  updateNotificationSchema,
  createNotificationSchema,
};

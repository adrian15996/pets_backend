const joi = require('joi');

const id = joi.string();
const titulo = joi.string().min(1);
const contenido = joi.string().min(1);
const posterId = joi.number();
const categoryId = joi.number();

const createPostSchema = joi.object({
  id: id,
  titulo: titulo.required(),
  contenido: contenido.required(),
  posterId: posterId.required(),
  categoryId: posterId.required(),
});

const updatePostSchema = joi.object({
  titulo,
  contenido,
  posterId,
  categoryId,
});

const getPostSchema = joi.object({
  id: id.required(),
});

module.exports = { getPostSchema, updatePostSchema, createPostSchema };

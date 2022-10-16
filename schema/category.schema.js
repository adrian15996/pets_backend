const joi = require('joi');

const id = joi.string();
const name = joi.string();
const image = joi.string();

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = joi.object({
  name: name,
  image:image,
});

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};

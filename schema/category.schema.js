const joi = require('joi');

const id = joi.string();
const category = joi.string();

const createCategorySchema = joi.object({
  category: category.required(),
});

const updateCategorySchema = joi.object({
  category,
});

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = {
  getCategorySchema,
  updateCategorySchema,
  createCategorySchema,
};

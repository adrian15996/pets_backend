'use strict';

const { PetsSchema,PETS_TABLE } = require('./../models/pets.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PETS_TABLE, PetsSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PETS_TABLE);
  },
};

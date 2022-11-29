'use strict';

const { VeterinarySchema, VETERINARY_TABLE } = require('./../models/veterinary.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(VETERINARY_TABLE, VeterinarySchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(VETERINARY_TABLE);
  },
};

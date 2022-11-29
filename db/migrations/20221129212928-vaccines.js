'use strict';

const { VaccineSchema, VACCINE_TABLE } = require('./../models/vaccines.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(VACCINE_TABLE, VaccineSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(VACCINE_TABLE);
  },
};

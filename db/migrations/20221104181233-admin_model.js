'use strict';

const { AdminSchema,ADMIN_TABLE } = require('./../models/administrador.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ADMIN_TABLE,AdminSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ADMIN_TABLE);
  },
};

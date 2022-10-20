'use strict';

const { PersonSchema, PERSON_TABLE } = require('./../models/person.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PERSON_TABLE, PersonSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PERSON_TABLE);
  },
};

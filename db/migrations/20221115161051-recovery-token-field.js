'use strict';
const {  DataTypes } = require('sequelize');

const { PERSON_TABLE} = require('./../models/person.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(PERSON_TABLE, 'recovery_token', {
      allowNull: true,
      field: 'recovery_token',
      type: DataTypes.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PERSON_TABLE, 'recovery_token');
  },
};

'use strict';
const { DataTypes } = require('sequelize');

const { PETS_TABLE } = require('./../models/pets.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(PETS_TABLE, 'foto', {
      allowNull: true,
      type: DataTypes.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PETS_TABLE, 'foto');
  },
};

'use strict';
const {  DataTypes } = require('sequelize');

const { PETS_TABLE} = require('./../models/pets.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(PETS_TABLE, 'id_pet',{
      allowNull: false,
      type: DataTypes.STRING,
      field: 'id_pet',
      defaultValue: '1',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PETS_TABLE, 'id_pet');
  },
};

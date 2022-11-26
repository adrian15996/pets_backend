'use strict';
const {  DataTypes } = require('sequelize');

const { POST_TABLE} = require('./../models/post.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(POST_TABLE, 'foto',{
    type: DataTypes.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(POST_TABLE, 'foto');
  },
};

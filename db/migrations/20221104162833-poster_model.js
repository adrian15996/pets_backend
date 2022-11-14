'use strict';

const { PosterSchema,POSTER_TABLE } = require('./../models/poster.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(POSTER_TABLE,PosterSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(POSTER_TABLE);
  },
};

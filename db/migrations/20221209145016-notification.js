'use strict';

const { NotificationSchema,NOTIFICATION_TABLE } = require('./../models/notification.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(NOTIFICATION_TABLE, NotificationSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(NOTIFICATION_TABLE);
  },
};

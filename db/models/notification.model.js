const { Model, DataTypes, Sequelize } = require('sequelize');

const { PETS_TABLE } = require('./pets.model');

const NOTIFICATION_TABLE = 'notification';

const NotificationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_category',
    type: DataTypes.INTEGER,
  },
  titulo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  mensaje: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  identificador: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dateHour: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'date_hour',
  },
  petId: {
    allowNull: false,
    field: 'id_pets',
    type: DataTypes.INTEGER,
    references: {
      model: PETS_TABLE,
      key: 'id_pets',
    },
  },
  petsIdPets: {
    allowNull: true,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

class Notification extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Pets, { as: 'pets' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTIFICATION_TABLE,
      modelName: 'Notification',
      timestamps: false,
    };
  }
}

module.exports = { NOTIFICATION_TABLE, NotificationSchema, Notification };

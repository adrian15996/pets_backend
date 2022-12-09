const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSON_TABLE } = require('./person.model');
const ADMIN_TABLE = 'admin';

const AdminSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'administrador',
  },
  foto: {
    allowNull: true,
    type: DataTypes.STRING.BINARY,
  },

  personId: {
    allowNull: false,
    field: 'id_person',
    type: DataTypes.INTEGER,
    references: {
      model: PERSON_TABLE,
      key: 'id_person',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

class Admin extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Person, { as: 'person' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ADMIN_TABLE,
      modelName: 'Admin',
      timestamps: false,
    };
  }
}

module.exports = { ADMIN_TABLE, AdminSchema, Admin };

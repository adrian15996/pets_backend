const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSON_TABLE } = require('./person.model');
const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  aboutMe: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: 'Estoy usando Animal App',
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'user',
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
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

class User extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Person, { as: 'person' });
    this.hasMany(models.Pets, {
      as: 'pets',
      foreignKey: 'userId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };

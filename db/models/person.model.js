const { Model, DataTypes, Sequelize } = require('sequelize');

const PERSON_TABLE = 'person';

const PersonSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_person',
    type: DataTypes.INTEGER,
  },
  name:{
    allowNull:false,
    type:DataTypes.STRING,

  },
  gender:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'HOMBRE',
  }
  ,
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
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

class Person extends Model {
  static associate(models) {
    //associate
    this.hasOne(models.User, {
      as: 'user',
      foreignKey: 'id_person',
    });
    this.hasOne(models.Poster, {
      as: 'poster',
      foreignKey: 'id_person',
    });
    this.hasOne(models.Admin, {
      as: 'admin',
      foreignKey: 'id_person',
    });
    
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSON_TABLE,
      modelName: 'Person',
      timestamps: false,
    };
  }
}

module.exports = { PERSON_TABLE, PersonSchema, Person };

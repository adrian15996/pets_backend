const { Model, DataTypes, Sequelize } = require('sequelize');

const {USER_TABLE}= require('./user.model');

const PETS_TABLE = 'pets';

const PetsSchema = {
  idPets: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_pets',
    type: DataTypes.INTEGER,
  },
  name:{
    allowNull:false,
    type:DataTypes.STRING,

  },
  gender:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'MACHO',
  }
  ,
  foto: {
    allowNull: true,
    type: DataTypes.STRING,
  },

  idBreed:{
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_breed',
    defaultValue: '1',
  }
  ,
  idPet:{
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_pet',
    defaultValue: '1',
  }
  ,
  idTP:{
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_type_pet',
    defaultValue: '1',
  }
  ,
  breed: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'desconocida',
  },
  size: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  typePet: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'type_pet',
    defaultValue: '1',
  },
  dateOfBirth: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'date_of_birth',
  },
  userId: {
    allowNull: false,
    field: 'id_user',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW'),
  }
};

class Pets extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.User, { as: 'user' });

    this.hasMany(models.Veterinary, {
      as: 'Veterinary',
      foreignKey: 'petId',
    });
    this.hasMany(models.Vaccine, {
      as: 'vaccine',
      foreignKey: 'petId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PETS_TABLE,
      modelName: 'Pets',
      timestamps: false,
    };
  }
}

module.exports = { PETS_TABLE, PetsSchema, Pets };

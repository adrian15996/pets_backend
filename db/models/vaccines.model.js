const { Model, DataTypes, Sequelize } = require('sequelize');
const { PETS_TABLE } = require('./pets.model');
const { VETERINARY_TABLE } = require('./veterinary.model');
const VACCINE_TABLE = 'vaccines';

const VaccineSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_vaccine',
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "desconocida",
  },
  date: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  tag: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nextVaccine: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  firma: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  petId: {
    allowNull: false,
    field: 'id_pets',
    type: DataTypes.INTEGER,
    references: {
      model: PETS_TABLE,
      key: 'id_pets',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  veterinaryId: {
    allowNull: false,
    field: 'id_veterinary',
    type: DataTypes.INTEGER,
    references: {
      model: VETERINARY_TABLE,
      key: 'id',
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
  petsIdPets: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class Vaccine extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Pets, { as: 'pets' });
    this.belongsTo(models.Veterinary, { as: 'veterinary' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: VACCINE_TABLE,
      modelName: 'Vaccine',
      timestamps: false,
    };
  }
}

module.exports = { VACCINE_TABLE, VaccineSchema, Vaccine };

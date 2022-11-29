const { Model, DataTypes, Sequelize } = require('sequelize');
const { PETS_TABLE } = require('./pets.model');
const VETERINARY_TABLE = 'veterinaries';

const VeterinarySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  direccion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  cedulaProfesional: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'cedula_profesional',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: true,
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

class Veterinary extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Pets, { as: 'pets' });
    this.hasMany(models.Vaccine, {
      as: 'vaccine',
      foreignKey: 'veterinaryId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: VETERINARY_TABLE,
      modelName: 'Veterinary',
      timestamps: false,
    };
  }
}

module.exports = { VETERINARY_TABLE, Veterinary, VeterinarySchema };

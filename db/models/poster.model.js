const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSON_TABLE } = require('./person.model');
const POSTER_TABLE = 'Poster';

const PosterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_poster',
    type: DataTypes.INTEGER,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'poster',
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

class Poster extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Person, { as: 'person' });
    this.hasMany(models.Post,{
        as: 'poster',
        foreignKey: 'id_poster',
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POSTER_TABLE,
      modelName: 'Poster',
      timestamps: false,
    };
  }
}

module.exports = { POSTER_TABLE, PosterSchema, Poster };

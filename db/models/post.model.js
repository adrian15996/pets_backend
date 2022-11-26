const { Model, DataTypes, Sequelize } = require('sequelize');
const { POSTER_TABLE } = require('./poster.model');
const { CATEGORY_TABLE } = require('./category.model');
const POST_TABLE = 'posts';

const PostSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_post',
    type: DataTypes.INTEGER,
  },
  titulo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  foto: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  contenido: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  posterId: {
    allowNull: false,
    field: 'id_poster',
    type: DataTypes.INTEGER,
    references: {
      model: POSTER_TABLE,
      key: 'id_poster',
    },
  },
  categoryId: {
    allowNull: false,
    field: 'id_category',
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id_category',
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

class Post extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsTo(models.Poster, { as: 'poster' });

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: 'Post',
      timestamps: false,
    };
  }
}

module.exports = { POST_TABLE, PostSchema, Post };

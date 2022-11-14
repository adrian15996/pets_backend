const { User, UserSchema } = require('./user.model');
const { Person, PersonSchema } = require('./person.model');
const {Pets, PetsSchema}= require('./pets.model')
const {Post, PostSchema}= require('./post.model')
const {Poster, PosterSchema}= require('./poster.model')
const {Category, CategorySchema}= require('./category.model')
const {Admin, AdminSchema}= require('./administrador.model')




const setupModels = (sequelize) => {
  Person.init(PersonSchema, Person.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Pets.init(PetsSchema, Pets.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize))
  Poster.init(PosterSchema,Poster.config(sequelize));
  Admin.init(AdminSchema, Admin.config(sequelize));

  Person.associate(sequelize.models);
  User.associate(sequelize.models);
  Pets.associate(sequelize.models);
  Post.associate(sequelize.models);
  Category.associate(sequelize.models);
  Poster.associate(sequelize.models);
  Admin.associate(sequelize.models);


};

module.exports = setupModels;

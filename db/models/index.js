const { User, UserSchema } = require('./user.model');
const { Person, PersonSchema } = require('./person.model');
const {Pets, PetsSchema}= require('./pets.model')

const setupModels = (sequelize) => {
  Person.init(PersonSchema, Person.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Pets.init(PetsSchema, Pets.config(sequelize));


  Person.associate(sequelize.models);
  User.associate(sequelize.models);
  Pets.associate(sequelize.models);


};

module.exports = setupModels;

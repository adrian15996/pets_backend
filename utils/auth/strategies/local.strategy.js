const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const personService = require('../../../services/person.service');
const service = new personService();

const LocalStrategy = new Strategy({
    usernameField:'email',
    passwordField:'password'
},async (username, password, done) => {
  try {
    const person = await service.findByEmail(username);
    if (!person) {
      done(boom.unauthorized(), false);
    }
    const isMatch = await bcrypt.compare(password, person.password);
    delete person.dataValues.password;
    if (!isMatch) {
      done(boom.unauthorized(), false);
    }
    done(null, person);
  } catch (error) {
    done(error, false);
  }
});

module.exports = LocalStrategy;

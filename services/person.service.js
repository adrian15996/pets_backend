const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class personService {
  constructor() {}
  async create(data) {
    const rta = await models.Person.create(data);
    return rta;
  }
  async find() {
    const rta = await models.Person.findAll({
      include:['persons']
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Person.findByPk(id);
    if (!rta) {
      throw boom.notFound('User not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const person = await this.findOne(id);
    const rta = await person.update(changes);
    return rta;
  }
  async delete(id) {
    const person = await this.findOne(id);
    const rta = await person.destroy();
    return { id };
  }
}
module.exports = personService;

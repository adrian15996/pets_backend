const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class vaccineService {
  constructor() {}
  async create(data) {
    const rta = await models.Vaccine.create(data);
    return rta;
  }
  async find() {
    const rta = await models.Vaccine.findAll();
    return rta;
  }
  async findOne(id) {
    const rta = await models.Vaccine.findByPk(id);
    if (!rta) {
      throw boom.notFound('Vaccine not Found');
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
module.exports = vaccineService;

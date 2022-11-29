const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class veterinaryService {
  constructor() {}
  async create(data) {
    const rta = await models.Veterinary.create(data);
    return rta;
  }
  async find() {
    const rta = await models.Veterinary.findAll({
      attributes: { exclude: ['petsIdPets'] },
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Veterinary.findByPk(id);
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
module.exports = veterinaryService;

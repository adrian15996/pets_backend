const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class petService {
  constructor() {}
  async create(data) {
    const rta = await models.Pets.create(data);
    return rta;
  }
  async find(id) {
    const rta = await models.Pets.findAll({
      where: {
        userId: id,
      },
      include:  ['Veterinary','vaccine'],
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Pets.findByPk(id);
    if (!rta) {
      throw boom.notFound('Pet not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const pets = await this.findOne(id);
    const rta = await pets.update(changes);
    return rta;
  }
  async delete(id) {
    const pets = await this.findOne(id);
    const rta = await pets.destroy();
    return { id };
  }
}
module.exports = petService;

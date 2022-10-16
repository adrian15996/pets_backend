const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class customerService {
  constructor() {}
  async create(data) {
    const rta = await models.Customer.create(data, {
      include: ['user'],
    });
    return rta;
  }
  async find() {
    const rta = await models.Customer.findAll({
      include: 'user',
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Customer.findByPk(id);
    if (!rta) {
      throw boom.notFound('User not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }
  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}
module.exports = customerService;

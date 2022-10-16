const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class productService {
  constructor() {}
  async create(data) {
    const rta = await models.Order.create(data);
    return rta;
  }
  async find() {
    const rta = await models.Order.findAll();
    return rta;
  }
  async findOne(id) {
    const rta = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!rta) {
      throw boom.notFound('Order not Found');
    }
    return rta;
  }
  async addItem(data) {
    const rta = await models.OrderProduct.create(data);
    return rta;
  }
  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }
  async delete(id) {
    const rta = await this.findOne(id);
    await models.Order.destroy(rta);
    return { id };
  }
}
module.exports = productService;

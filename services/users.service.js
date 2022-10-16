const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class userService {
  constructor() {}
  async create(data) {
    const rta = await models.User.create(data);
    return rta;
  }
  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.User.findByPk(id);
    if (!rta) {
      throw boom.notFound('User not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
  async delete(id) {
    const user = await this.findOne(id);
    const rta = await user.destroy();
    return { id };
  }
}
module.exports = userService;

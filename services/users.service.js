const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class userService {
  constructor() {}
  async create(data) {
    const hash = await bcrypt.hash(data.person.password, 10);
    data.person.password = hash;
    const newPerson = await models.Person.create(data.person);
    const rta = await models.User.create({
      ...data,
      personId: newPerson.id,
    });
    return rta;
  }
  async find(id) {
    const rta = await models.User.findAll({
      where: {
        id: id,
      },
      include: ['person'],
    });
    if (!rta) {
      throw boom.notFound('User not Found');
    }
    delete rta[0].person.dataValues.password;
    return rta;
  }

  // async getNotification(id) {
  //   const rta = await models.User.findByPk(id,{
  //     include: ['pets']
  //   });
  //   if (!rta) {
  //     throw boom.notFound('User not Found');
  //   }
  //   return rta;
  // }

  async findOne(id) {
    const rta = await models.User.findByPk(id, { include: ['person'] });
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

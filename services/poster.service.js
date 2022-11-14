const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


const { models } = require('../libs/sequelize');

class PosterService {
  constructor() {}
  async create(data) {
    console.log(data.person);
    const hash = await bcrypt.hash(data.person.password, 10);
    data.person.password = hash;
    const newPerson = await models.Person.create(data.person);
    const rta = await models.Poster.create({
      ...data,
      personId: newPerson.id,
    });
    return rta;
  }
  async find() {
    const rta = await models.Poster.findAll({
      include:['person']
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Poster.findByPk(id);
    if (!rta) {
      throw boom.notFound('Poster not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const adminitrator = await this.findOne(id);
    const rta = await adminitrator.update(changes);
    return rta;
  }
  async delete(id) {
    const adminitrator = await this.findOne(id);
    const rta = await adminitrator.destroy();
    return { message: 'deleted correctly', id };
  }
}
module.exports = PosterService;

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class PostService {
  constructor() {}
  async create(data) {
    const rta = await models.Post.create(data);
    return rta;
  }
  async find() {
    const rta = await models.Post.findAll({
      attributes: {
        exclude: ['createdAt','categoryId','id_category','id_poster','posterId'],
      },
      include: [
        {
          model: models.Category,
          as: 'category',
          attributes:{
            exclude:['createdAt','id']
          }
        },
        {
          model: models.Poster,
          as: 'poster',
          attributes:{
            exclude:['personId','id_person','createdAt']
          },
          include: {
            model: models.Person,
            as: 'person',
            attributes: {
              exclude: ['password', 'phone', 'createdAt','gender','email'],
            },
          },
        },
      ],
    });
    return rta;
  }
  async findOne(id) {
    const rta = await models.Post.findByPk(id);
    if (!rta) {
      throw boom.notFound('Poster not Found');
    }
    return rta;
  }
  async update(id, changes) {
    const post = await this.findOne(id);
    const rta = await post.update(changes);
    return rta;
  }
  async delete(id) {
    const post = await this.findOne(id);
    const rta = await post.destroy();
    return { message: 'deleted correctly', id };
  }
}
module.exports = PostService;

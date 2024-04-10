const { Category } = require('../models');

class CategoryController {
  async list(req, res, next) {
    const list = await Category.findAll({});

    return list;
  }

  async create(req, res, next) {
    const name = req.body.name;
    const gender = req.body.gender;

    if (!name || !gender) {
      throw new Error('Invalid data');
    }

    const category = await Category.create({
      name,
      gender,
      parentCategoryId: null,
    });

    return category;
  }
}

module.exports = new CategoryController();

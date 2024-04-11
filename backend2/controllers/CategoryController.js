const { Category } = require('../models');

class CategoryController {
  async list(req, res, next) {
    const { gender, parentCategoryId } = req.query;

    const where = {};

    if (gender) {
      where.gender = gender;
    }

    if (parentCategoryId) {
      where.parentCategoryId = parentCategoryId;
    }

    const list = await Category.findAll({ where });

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

const { Page } = require("../models");

class PageController {
  async list(req, res, next) {
    const where = {};

    const list = await Page.findAll({ where });

    return list;
  }

  async item(req, res, next) {
    const where = {
      alias: req.query.alias,
    };

    const item = await Page.findOne({ where });

    return item;
  }

  async create(req, res, next) {
    const { alias, name, content } = req.body;

    if (!alias || !name || !content) {
      throw new Error('Invalid input');
    }

    const page = await Page.create({
      alias,
      name,
      content,
    });

    return page;
  }
}

module.exports = new PageController();

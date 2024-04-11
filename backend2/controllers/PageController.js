const { Page } = require("../models");

class PageController {
  async list(req, res, next) {
    const where = {};

    const list = await Page.findAll({ where });

    return list;
  }

  async create(req, res, next) {
    const page = await Page.create({

    });

    return page;
  }
}

module.exports = new PageController();

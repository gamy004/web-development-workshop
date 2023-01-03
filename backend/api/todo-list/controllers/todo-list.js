'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createMyTodoList(ctx) {
    const { user } = ctx.state;
    const { title, description = null } = ctx.request.body;

    if (!title) {
      throw strapi.errors.badData(
        "title is required."
      );
    }

    const entity = await strapi.services["todo-list"].create({
      title,
      description,
      user: user.id
    });

    return sanitizeEntity(entity, { model: strapi.models["todo-list"] });
  }
};

'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findMyTodoListItem(ctx) {
    const { user } = ctx.state;

    let entities;

    if (ctx.query._q) {
      entities = await strapi.services["todo-list"].search({ ...ctx.query, user: user.id });
    } else {
      entities = await strapi.services["todo-list"].find({ ...ctx.query, user: user.id });
    }

    return sanitizeEntity(entities, { model: strapi.models["todo-list"] });
  },

  async createMyTodoListItem(ctx) {
    const { user } = ctx.state;
    const { title, description = null } = ctx.request.body;

    if (!title) {
      return ctx.badData("title is required.");
    }

    const entity = await strapi.services["todo-list"].create({
      title,
      description,
      user: user.id
    });

    return sanitizeEntity(entity, { model: strapi.models["todo-list"] });
  },

  async createMyTodoListItemV2(ctx) {
    const { user } = ctx.state;

    const entity = await strapi.services["todo-list"].createUserTodoListItem(user, ctx.request.body);

    return sanitizeEntity(entity, { model: strapi.models["todo-list"] });
  },

  async updateMyTodoListItem(ctx) {
    const { id } = ctx.params;
    const { title, description = null } = ctx.request.body;

    if (!title) {
      return ctx.badData("title is required.");
    }

    const entity = await strapi.services["todo-list"].update({ id }, {
      title,
      description
    });

    return sanitizeEntity(entity, { model: strapi.models["todo-list"] });
  },

  async deleteMyTodoListItem(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services["todo-list"].delete({ id });

    return sanitizeEntity(entity, { model: strapi.models["todo-list"] });
  },
};

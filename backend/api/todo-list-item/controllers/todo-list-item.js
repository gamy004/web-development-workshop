"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { RequiredException } = require("./../../../exceptions/exception");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createMyTodoListItem: async (ctx) => {
    try {
      const authUser = ctx.state.user;
      const { title, description } = ctx.request.body;

      if (!title) throw new RequiredException("title");

      let createdTodoListItem = await strapi.services["todo-list-item"].create({
        title,
        description,
        user: authUser.id,
      });

      ctx.send(
        sanitizeEntity(createdTodoListItem, {
          model: strapi.models["todo-list-item"],
        }),
        201
      );
    } catch (e) {
      if (e instanceof RequiredException) {
        return ctx.badData(e.message);
      }
      ctx.send(e.message, 500);
    }
  },

  createMyTodoListItemV2: async (ctx) => {
    try {
      const authUser = ctx.state.user;
      const body = ctx.request.body;
      let createdTodoListItem = await strapi.services[
        "todo-list-item"
      ].createUserTodoListItem(authUser, body);

      ctx.send(
        sanitizeEntity(createdTodoListItem, {
          model: strapi.models["todo-list-item"],
        }),
        201
      );
    } catch (e) {
      if (e instanceof RequiredException) {
        return ctx.badData(e.message);
      }
      ctx.send(e.message, 500);
    }
  },
  findMyTodoListItem: async (ctx) => {
    try {
      const authUser = ctx.state.user;

      let entities = await strapi.services["todo-list-item"].find({
        user: authUser.id,
      });

      ctx.send(
        entities.map((entity) =>
          sanitizeEntity(entity, { model: strapi.models["todo-list-item"] })
        ),
        200
      );
    } catch (e) {
      ctx.send(e.message, 500);
    }
  },
  updateMyTodoListItem: async (ctx) => {
    try {
      const id = ctx.params.id;
      const { title, description } = ctx.request.body;

      if (!title) throw new RequiredException("title");

      let updatedTodoListItem = await strapi.services["todo-list-item"].update(
        { id },
        {
          title,
          description,
        }
      );

      ctx.send(
        sanitizeEntity(updatedTodoListItem, {
          model: strapi.models["todo-list-item"],
        }),
        201
      );
    } catch (e) {
      if (e instanceof RequiredException) {
        return ctx.badData(e.message);
      }
      ctx.send(e.message, 500);
    }
  },
  deleteMyTodoListItem: async (ctx) => {
    try {
      const id = ctx.params.id;

      await strapi.services["todo-list-item"].delete({
        id,
      });

      ctx.send(null, 204);
    } catch (e) {
      ctx.send(e.message, 500);
    }
  },
};

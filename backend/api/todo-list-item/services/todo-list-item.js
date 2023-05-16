"use strict";
const { RequiredException } = require("./../../../exceptions/exception");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  createUserTodoListItem: async (authUser, body) => {
    const { title, description } = body;

    if (!title) throw new RequiredException("title");

    let createdTodoListItem = await strapi.services["todo-list-item"].create({
      title,
      description,
      user: authUser.id,
    });

    return createdTodoListItem;
  },
};

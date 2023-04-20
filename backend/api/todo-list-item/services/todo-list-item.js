"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async createMyTodoListItemV2(user, data) {
    const { title, description = null } = data;

    // if (!data.title || !data.title.length || data.title.trim() === "") {
    //   throw new data.badData("Title is invalid.");
    // }

    if (!title || !title.length) {
      throw strapi.errors.badData("title is required.");
    }
    // const validData = await strapi.entityValidator.validateEntityCreation(
    //   strapi.models["todo-list-item"],
    //   data
    // );

    const entry = await strapi
      .query("todo-list-item")
      .create({ title, description, user: user.id }, []); //validdata+query+create

    return entry;
  },
};

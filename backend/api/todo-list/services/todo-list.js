'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   *
   * @param {object} user
   * @param {object} body
   * @returns {object} entity
   */
  async createUserTodoListItem(user, body) {
    const { title, description = null } = body;

    if (!title) {
      throw strapi.errors.badData("title is required.");
    }

    const entity = await strapi.services["todo-list"].create({
      title,
      description,
      user: user.id
    });

    return entity;
  },
};

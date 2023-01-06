'use strict';
const { isDraft } = require('strapi-utils').contentTypes;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const isValidCreateBody = (body) => {
  if (body) {
    if (!body.title) {
      return false
    }
  }
  return true
}
module.exports = {
  async create(uid, data) {

    data.user = uid;
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.todo_list_item,
      data,
      { isDraft: isDraft(data, strapi.models.todo_list_item) }
    );
    if (!isValidCreateBody(data)) {
      throw strapi.errors.badData("title is required.")
    }


    const entry = await strapi.query('todo-list-item').create(validData);

    return entry;
  },
  async findMyTodoListItem(uid) {
    return await strapi.query("todo-list-item").find({ user: uid })
  },
  async updateMyTodoListItem(data) {
    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.models.todo_list_item,
      data,
      { isDraft: isDraft(data, strapi.models.todo_list_item) }
    );

    const entry = await strapi.query('todo-list-item').update({ id: data.id }, validData);
    return entry
  },
  async deleteMyTodoListItem(params) {
    const entry = await strapi.query('todo-list-item').delete(params);
    return entry
  },
  async isOwner(uid, iid) {

    return await strapi.query("todo-list-item").count({ _where: [{ user: uid }, { id: iid }] })
  }
}


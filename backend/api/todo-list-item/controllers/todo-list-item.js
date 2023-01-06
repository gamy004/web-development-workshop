'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const service = "todo-list-item";
const isValidCreateBody = (ctx) => {
  const body = ctx.request.body
  if (body) {
    if (!body.title) {
      return false
    }
  }
  return true
}
const isValidUpdateBody = (ctx) => {
  const body = ctx.request.body
  if (body) {
    if (!body.title) {
      return false
    }
    if (!body.id) {
      return false
    }
  }
  return true
}


module.exports = {
  async createMyTodoListItem(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized("You're not logged in!")
    }
    if (!isValidCreateBody(ctx)) {
      if (!ctx.request.body.title) {
        return ctx.badData("title is required.")
      }
    }
    let entity
    const service = "todo-list-item";
    entity = await strapi.services[service].create(ctx.state.user.id, ctx.request.body)
    return entity


  },
  async findMyTodoListItem(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized("You're not logged in!")
    }
    let entities
    const service = "todo-list-item";
    entities = await strapi.services[service].findMyTodoListItem(ctx.state.user.id)
    return sanitizeEntity(entities, { model: strapi.models["todo-list-item"] })
  },
  async updateMyTodoListItem(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized("You're not logged in!")
    }
    if (!isValidUpdateBody(ctx)) {
      return ctx.badData(`title and id is required.`);
    }
    let entity
    entity = await strapi.services[service].updateMyTodoListItem(ctx.request.body)
    return entity
  },
  async deleteMyTodoListItem(ctx) {
    console.log(ctx.params)
    return await strapi.services[service].deleteMyTodoListItem(ctx.params)
  }
}
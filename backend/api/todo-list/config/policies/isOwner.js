module.exports = async (ctx, next) => {
  const exists = await strapi.services["todo-list"].count({ id: ctx.params.id, user: ctx.state.user.id });

  if (exists) {
    // Go to next policy or will reach the controller's action.
    return await next();
  }

  ctx.unauthorized(`You're not allowed to update or delete this todo list item!`);
};

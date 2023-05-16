module.exports = async (ctx, next) => {
  const authUser = ctx.state.user;
  const count = await strapi.services["todo-list-item"].count({
    id: ctx.params.id,
    user: authUser.id,
  });

  if (count) return await next();

  ctx.unauthorized(`You're not allowed to perform this action!`);
};

module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    const iid = ctx.request.body.id ? ctx.request.body.id : ctx.params.id
    const uid = ctx.state.user.id

    if (!uid) {
      return ctx.unauthorized("You're not logged in!")
    }

    if (!iid) {
      return ctx.badData("id is requied")
    }


    let isOwner = await strapi.services["todo-list-item"].isOwner(uid, iid)

    if (isOwner) {
      return await next();
    }

  }
  ctx.forbidden(`You're not owner`);
}
module.exports = async (ctx, next) => {
  const body = ctx.request.body
  if (body) {
    if (body.title) {
      return await next()
    }
  }

  return ctx.badData(`title is required.`);

};
module.exports = async (ctx, next) => {
    const { id } = ctx.params;

    const {user} = ctx.state;

    let userTask = await strapi.query('todo-list-item').findOne({id, user: user.id});

    if (userTask) {
      // Go to next policy or will reach the controller's action.
      return await next();
    }
  
    ctx.forbidden(`You're not Owner`);
  };
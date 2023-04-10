'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async createMyTodoListItem(ctx) {
        const {user} = ctx.state;

        let entity;

        const { title, description = null  } = ctx.request.body;
        
        if (!title || !title.length) {
            return ctx.badData("Title is invalid.");
        }

        entity = await strapi.services['todo-list-item'].create({ title, description, user: user.id });

        const insertedEntity = await strapi.services['todo-list-item'].findOne({ id: entity.id });

       return sanitizeEntity(insertedEntity, { model: strapi.models['todo-list-item'] });   
    },

    async findMyTodoListItem(ctx) {
        const {user} = ctx.state;
        let entities;

        if (ctx.query._q) {
          entities = await strapi.services['todo-list-item'].search({ _q: ctx.query._q, user: user.id });
        } else {
          entities = await strapi.services['todo-list-item'].find({ ...ctx.query, user: user.id },[]);
        }
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['todo-list-item'] }));
      },

      async updateMyTodoListItem(ctx){
        const { id } = ctx.params;
        let entity;

        const { title, description = null  } = ctx.request.body;
       
        if (!title || !title.length) {
            return ctx.badData("title is required");
        }
      
        entity = await strapi.services['todo-list-item'].update({id},{title,description});
        return sanitizeEntity(entity, { model: strapi.models['todo-list-item'] });

      }, 
      
      async deleteMyTodoListItem(ctx){
        const { id } = ctx.params;

        const entity = await strapi.services['todo-list-item'].delete({ id });

        return sanitizeEntity(entity, { model: strapi.models['todo-list-item'] });
      },

      async createMyTodoListItemV2(ctx){
        const {user} = ctx.state;
        const { title, description = null  } = ctx.request.body;

        if (!title || !title.length) {
          throw new ctx.badData("Title is invalid.");
        }

        return await strapi.services['todo-list-item'].createMyTodoListItemV2(user, { title, description }) //เรียกและส่งข้อมูลไปยัง services
      }

};

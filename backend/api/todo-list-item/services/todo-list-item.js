'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async createMyTodoListItemV2(user, data){
        
        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models['todo-list-item'],
            data
        );
    
        const entry = await strapi.query('todo-list-item').create({ ...validData, user }); //validdata+query+create
    
        return entry;
    }
}
'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  strapi.log.debug("start bootstrap!");

  const authenticatedRole = await strapi.query("role", "users-permissions")
    .findOne({ name: "Authenticated" });

  await strapi
    .query("permission", "users-permissions")
    .update({ type: "application", controller: "todo-list-item", action: "createmytodolistitem", role: authenticatedRole.id }, { enabled: true });

};

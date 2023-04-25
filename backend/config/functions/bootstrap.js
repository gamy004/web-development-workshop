"use strict";

/**
 * Grants database `permissions` table that role can access an endpoint/controllers
 *
 * @param {int} roleID, 1 Autentihected, 2 Public, etc
 * @param {string} value, in form or dot string eg `"permissions.users-permissions.controllers.auth.changepassword"`
 * @param {boolean} enabled, default true
 * @param {string} policy, default ''
 */
const grantPrivilege = async (
  roleID = 1,
  value,
  enabled = true,
  policy = ""
) => {
  const updateObj = value
    .match(/[a-zA-Z-]+[^.|^[\]']/gm)
    .reduceRight((obj, next) => ({ [next]: obj }), { enabled, policy });

  return strapi.plugins[
    "users-permissions"
  ].services.userspermissions.updateRole(roleID, updateObj);
};

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
  strapi.log.debug("start bootstrap");

  const authenticatedRole = await strapi
    .query("role", "users-permissions")
    .findOne({ name: "Authenticated" }, ["permissions"]);

  await grantPrivilege(
    authenticatedRole.id,
    "permissions.application.controllers.todo-list-item.createmytodolistitem",
    true
  );
  await grantPrivilege(
    authenticatedRole.id,
    "permissions.application.controllers.todo-list-item.updatemytodolistitem",
    true
  );
  await grantPrivilege(
    authenticatedRole.id,
    "permissions.application.controllers.todo-list-item.deletemytodolistitem",
    true
  );
};

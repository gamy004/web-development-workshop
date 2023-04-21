const Strapi = require("strapi");
const fs = require("fs");
const path = require("path");
const http = require("http");

jest.setTimeout(30000);

let instance;

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();

    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}

async function stopStrapi() {
  if (instance) {
    for (const conn of Object.values(instance.connections)) {
      if ("destroy" in conn) {
        await conn.destroy();
      }
    }

    if (instance.db) {
      instance.db.destroy();
    }

    if (instance.server) {
      instance.server.close();
    }

    clearDatabase();
  }

  return instance;
}

function clearDatabase() {
  const dbSettings = strapi.config.get("database.connections.default.settings");

  if (dbSettings && dbSettings.filename) {
    const dbFilePath = path.resolve(process.env.PWD, dbSettings.filename);

    if (fs.existsSync(dbFilePath)) {
      fs.unlinkSync(dbFilePath);
    }
  }
}

/**
 * Returns valid JWT token for authenticated
 * @param {String | number} idOrEmail, either user id, or email
 */
const jwt = (idOrEmail) =>
  strapi.plugins["users-permissions"].services.jwt.issue({
    [Number.isInteger(idOrEmail) ? "id" : "email"]: idOrEmail,
  });

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

/** Updates database `permissions` that role can access an endpoint
 * @see grantPrivilege
 */

const grantPrivileges = async (roleID = 1, values = []) => {
  await Promise.all(values.map((val) => grantPrivilege(roleID, val)));
};

module.exports = {
  sleep,
  setupStrapi,
  stopStrapi,
  clearDatabase,
  grantPrivilege,
  grantPrivileges,
  jwt,
};

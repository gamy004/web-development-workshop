const { setupStrapi, clearDatabase } = require("./helpers/strapi");

/** this code is called once before any test is called */
beforeAll(async (done) => {
  await setupStrapi(); // singleton so it can be called many times

  strapi.log.debug("setup strapi done");

  done();
});

/** this code is called once before all the tested are finished */
afterAll(async (done) => {
  //delete test database after all tests
  clearDatabase();

  //close server to release the db-file
  await strapi.destroy();

  done();
});

it("strapi is defined", async () => {
  expect(true).toBe(true);
});

require("./api/todo-list-item.js");

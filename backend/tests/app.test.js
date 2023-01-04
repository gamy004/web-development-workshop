const { setupStrapi, clearDatabase } = require("./helpers/strapi");

/** this code is called once before any test is called */
beforeAll(async () => {
  await setupStrapi(); // singleton so it can be called many times

  strapi.log.debug("setup strapi done");
});

/** this code is called once before all the tested are finished */
afterAll(async () => {
  //delete test database after all tests
  clearDatabase();

  strapi.log.debug("clear strapi done");

  //close server to release the db-file
  await strapi.destroy();

});

it("strapi is defined", async () => {
  const entity = await strapi.services["todo-list"].create({ "title": "dummy todo" });

  console.log(entity);

  expect(true).toBe(true);
});

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

  //close server to release the db-file
  await strapi.destroy();
});

it("strapi is defined", () => {
  expect(true).toBe(true);
});

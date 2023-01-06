let serviceName = "todo-list-item"
describe("service: todo-list-item.js", () => {
  beforeEach(async () => {
    await strapi.query("todo-list-item").delete();
    await strapi.query("user", "users-permissions").delete();
  });

  afterAll(async () => {
    //
    await strapi.query("todo-list-item").delete();
    await strapi.query("user", "users-permissions").delete();
  });

  it("should create new todo list item of given user", async () => {
    //
    let todoItem = {
      title: "test title name",
      description: "tes description with very looooooooooooooooog text"
    }
    let user = await strapi.query("user", "users-permissions").create({ username: "test user name ", email: "test_name@mail.com" })

    let entity = await strapi.services[serviceName].create(user.id, todoItem)
    expect(entity.user.id).toBe(user.id)
  });

  it("should create new todo list item of given title and description", async () => {
    let todoItem = {
      title: "test title name",
      description: "tes description with very looooooooooooooooog text"
    }
    let user = await strapi.query("user", "users-permissions").create({ username: "test user name ", email: "test_name@mail.com" })

    let entity = await strapi.services[serviceName].create(user.id, todoItem)

    expect(entity).toHaveProperty("title", todoItem.title)
    expect(entity).toHaveProperty("description", todoItem.description)
  });
  it("should throw badData error when title is not defined or empty", async () => {
    let todoItem = {
      title: "",
      description: "tes description with very looooooooooooooooog text"
    }
    let user = await strapi.query("user", "users-permissions").create({ username: "test user name ", email: "test_name@mail.com" })


    await expect(
      strapi.services[serviceName].create(user.id, todoItem)
    ).rejects.toMatchObject(strapi.errors.badData("title is required."));
  })
});
const clearData = async () => {
  await strapi.query("user", "users-permissions").delete();
  await strapi.query("todo-list").delete();
};

describe("service: todo-list-item", () => {
  beforeEach(async () => {
    await clearData();
  });

  afterAll(async () => {
    await clearData();
  });

  it("should create new todo list item of given user", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({ username: 'test', email: 'test@mail.com' });

    const mockData = {title: "test title"};

    const entity = await strapi.services["todo-list"].createUserTodoListItem(mockUser, mockData);

    expect(entity.user.id).toBe(mockUser.id);
  });

  it("should create new todo list item of given title and description", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({ username: 'test', email: 'test@mail.com' });

    const mockData = {title: "test title", description: "<p>Test</p>"};

    const entity = await strapi.services["todo-list"].createUserTodoListItem(mockUser, mockData);

    expect(entity.title).toBe(mockData.title);
    expect(entity.description).toBe(mockData.description);
  });

  it("should throw badData error when title is not defined or empty", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({ username: 'test', email: 'test@mail.com' });

    const mockData = {description: "<p>Test</p>"};

    await expect(
      strapi.services["todo-list"].createUserTodoListItem(mockUser, mockData)
    ).rejects.toMatchObject(strapi.errors.badData("title is required."));
  });
});

const { RequiredException } = require("./../../exceptions/exception");

const clearData = async () => {
  await strapi.query("user", "users-permissions").delete();
  await strapi.query("todo-list-item").delete();
};

const createTestUser = async () => {
  await strapi
    .query("user", "users-permissions")
    .create({ username: "test", email: "test@mail.com" });
};

describe("service: todo-list-item", () => {
  beforeEach(async () => {
    await clearData();
    await createTestUser();
  });

  afterAll(async () => {
    await clearData();
  });

  it("should create new todo list item of given user", async () => {
    const mockUser = await strapi
      .query("user", "users-permissions")
      .findOne({ username: "test" });

    const mockTodoListItem = {
      title: "test title",
      description: "description",
    };

    const createdTodoListItem = await strapi.services[
      "todo-list-item"
    ].createUserTodoListItem(mockUser, mockTodoListItem);

    expect(createdTodoListItem).not.toBeNull();
    expect(createdTodoListItem.user.id).toBe(mockUser.id);
  });

  it("should create new todo list item of given title and description", async () => {
    const mockUser = await strapi
      .query("user", "users-permissions")
      .findOne({ username: "test" });

    const mockTodoListItem = {
      title: "test title",
      description: "description",
    };

    const createdTodoListItem = await strapi.services[
      "todo-list-item"
    ].createUserTodoListItem(mockUser, mockTodoListItem);

    expect(createdTodoListItem).not.toBeNull();
    expect(createdTodoListItem.title).toBe(mockTodoListItem.title);
    expect(createdTodoListItem.description).toBe(mockTodoListItem.description);
  });

  it("should throw badData error when title is not defined or empty", async () => {
    const mockUser = await strapi
      .query("user", "users-permissions")
      .findOne({ username: "test" });

    const mockTodoListItem = {
      description: "description",
    };

    await expect(
      strapi.services["todo-list-item"].createUserTodoListItem(
        mockUser,
        mockTodoListItem
      )
    ).rejects.toThrow(new RequiredException("title"));
  });
});

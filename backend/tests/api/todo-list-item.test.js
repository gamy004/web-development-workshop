const { setupStrapi, clearDatabase } = require("./../helpers/strapi");

async function clearAllMockData() {
  await strapi.query("user", "users-permissions").delete();
}

describe("service: todo-list-item", () => {
  beforeEach(async () => {
    await setupStrapi();
    await clearAllMockData();
  });

  afterAll(async () => {
    await clearAllMockData();
    clearDatabase();
    await strapi.destroy();
  });

  it("Should create new todo list item of given user", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
    });

    const mockTodolist = {
      title: "test title",
      description: "test description",
    };

    const entity = await strapi.services[
      "todo-list-item"
    ].createMyTodoListItemV2(mockUser, mockTodolist);

    expect(entity.user.username).toEqual(mockUser.username);
    expect(entity.user.id).toEqual(mockUser.id);
  });

  it("Should create new todo list item of given title and description", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
    });

    const mockTodolist = {
      title: "test title",
      description: "test description",
    };

    const entity = await strapi.services[
      "todo-list-item"
    ].createMyTodoListItemV2(mockUser, mockTodolist);

    expect(entity.title).toEqual(mockTodolist.title);
    expect(entity.description).toEqual(mockTodolist.description);
  });

  it("Should throw badData error when title is not defined or empty", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
    });

    const mockTodolist = {
      title: "",
      description: "test",
    };

    async function createEntity() {
      await strapi.services["todo-list-item"].createMyTodoListItemV2(
        mockUser,
        mockTodolist
      );
    }

    await expect(createEntity()).rejects.toThrowError("title is required");
  });
});

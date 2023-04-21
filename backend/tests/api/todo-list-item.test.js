const request = require("supertest");
const {
  setupStrapi,
  clearDatabase,
  grantPrivilege,
  jwt,
} = require("./../helpers/strapi");

async function clearAllMockData() {
  await strapi.query("user", "users-permissions").delete();
  await strapi.query("todo-list-item").delete();
}

describe("service: todo-list-item", () => {
  beforeEach(async () => {
    await setupStrapi();
    await clearAllMockData();
  });

  afterAll(async () => {
    await clearAllMockData();
    await clearDatabase();
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

  // API testing example
  it("should return empty array when no todo list items", async () => {
    // Add mock user with role "Authenticated"
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1, // Authenticated
    });

    // Generate jwt token for mock User
    const authToken = jwt(mockUser.id);

    // Enable API that will be tested for role Authenticated
    // ชื่อ controller ใช้ตาม directory เช่น todo-list-item
    // ชื่อ action ที่ใช้ เป็น lowercase ทั้งหมด เช่น findMyTodoListItem ใช้ findmytodolistitem
    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.findmytodolistitem",
      true
    );

    // call API attached with Authorization header using generated jwt from line 94
    await request(strapi.server)
      .get("/my/todo-list-items")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200) // Expect response http code 200
      .then((res) => {
        expect(res.body).toStrictEqual([]); // expect the response text
      });

    // Disable API that will be tested for role Authenticated
    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.findmytodolistitem",
      false
    );
  });
});

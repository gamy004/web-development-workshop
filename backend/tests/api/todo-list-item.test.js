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

  it("Should return update todolist item", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1,
    });

    const authToken = jwt(mockUser.id);

    const mockTodolist = {
      title: "test title",
      description: "test description",
      user: mockUser.id,
    };

    const mockTodolistEntity = await strapi
      .query("todo-list-item")
      .create(mockTodolist);

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.updatemytodolistitem",
      true
    );

    await request(strapi.server)
      .put(`/my/todo-list-items/${mockTodolistEntity.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "update title",
        description: "update description",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("update title");
        expect(res.body.description).toBe("update description");
      });

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.updatemytodolistitem",
      false
    );
  });

  it("Should cannot return update todolist item when not owner", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1,
    });

    const authToken = jwt(mockUser.id);

    const mockTodolist = {
      title: "test title",
      description: "test description",
      user: 10,
    };

    const mockTodolistEntity = await strapi
      .query("todo-list-item")
      .create(mockTodolist);

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.updatemytodolistitem",
      true
    );

    await request(strapi.server)
      .put(`/my/todo-list-items/${mockTodolistEntity.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "update title",
        description: "update description",
      })
      .expect(403)
      .then((res) => {
        expect(res.body.error).toBe("Forbidden");
        expect(res.body.message).toBe("You're not Owner");
      });

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.updatemytodolistitem",
      false
    );
  });

  it("Should return new todolist", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1,
    });

    const authToken = jwt(mockUser.id);

    const mockTodolist = {
      title: "test title",
      description: "test description",
    };

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.createmytodolistitem",
      true
    );

    await request(strapi.server)
      .post("/my/todo-list-items")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        ...mockTodolist,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("test title");
        expect(res.body.description).toBe("test description");
      });

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.createmytodolistitem",
      false
    );
  });

  it("Should cannot return new todolist when don't have title", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1,
    });

    const authToken = jwt(mockUser.id);

    const mockTodolist = {
      title: "",
      description: "test description",
    };

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.createmytodolistitem",
      true
    );

    await request(strapi.server)
      .post("/my/todo-list-items")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        ...mockTodolist,
      })
      .expect(422)
      .then((res) => {
        expect(res.body.error).toBe("Unprocessable Entity");
        expect(res.body.message).toBe("Title is invalid.");
      });

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.createmytodolistitem",
      false
    );
  });

  it("Should delete todolist when you are owner", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1,
    });

    const authToken = jwt(mockUser.id);

    const mockTodolist = {
      title: "delete title",
      description: "delete description",
      user: mockUser.id,
    };

    const mockTodolistEntity = await strapi
      .query("todo-list-item")
      .create(mockTodolist);

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.deletemytodolistitem",
      true
    );

    await request(strapi.server)
      .delete(`/my/todo-list-items/${mockTodolistEntity.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body.title).toBe("delete title");

        const todolistItem = await strapi
          .query("todo-list-item")
          .findOne({ id: mockTodolistEntity.id });
        expect(todolistItem).toBe(null);
      });

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.deletemytodolistitem",
      false
    );
  });

  it("Should delete todolist when you are not owner", async () => {
    const mockUser = await strapi.query("user", "users-permissions").create({
      username: "userMock",
      email: "userMock@test.com",
      role: 1,
    });

    const authToken = jwt(mockUser.id);

    const mockTodolist = {
      title: "delete title",
      description: "delete description",
      user: 200,
    };

    const mockTodolistEntity = await strapi
      .query("todo-list-item")
      .create(mockTodolist);

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.deletemytodolistitem",
      true
    );

    await request(strapi.server)
      .delete(`/my/todo-list-items/${mockTodolistEntity.id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(403)
      .then(async (res) => {
        expect(res.body.error).toBe("Forbidden");
        expect(res.body.message).toBe("You're not Owner");

        const todolistItem = await strapi
          .query("todo-list-item")
          .findOne({ id: mockTodolistEntity.id });
        console.log(todolistItem);
        expect(todolistItem.id).toEqual(mockTodolistEntity.id);
      });

    await grantPrivilege(
      1,
      "permissions.application.controllers.todo-list-item.deletemytodolistitem",
      false
    );
  });
});

const request = require('supertest');
let token
let uid
describe("controller: todo-list-item.js", () => {
  beforeEach(async () => {
    await strapi.query("todo-list-item").delete();

  });

  beforeAll(async () => {
    let test_user = {
      username: "test user name ",
      email: "test_name@mail.com",
      password: "123456"
    }

    await request(strapi.server)
      .post('/auth/local/register')
      .send(test_user)
      .then((res) => {
        token = "Bearer " + res.body.jwt
        uid = res.body.user.id
      });


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
    await request(strapi.server)
      .post('/my/todo-list-items')
      .send(todoItem)
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.user.id).toBe(uid)
      })
  });

  it("should create new todo list item of given title and description", async () => {
    let todoItem = {
      title: "test title name",
      description: "tes description with very looooooooooooooooog text"
    }
    await request(strapi.server)
      .post('/my/todo-list-items')
      .send(todoItem)
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.title).toBe(todoItem.title)
        expect(res.body.description).toBe(todoItem.description)
      })
  });
  it("should throw badData error when title is not defined or empty", async () => {
    let todoItem = {
      title: "",
      description: "tes description with very looooooooooooooooog text"
    }
    await request(strapi.server)
      .post('/my/todo-list-items')
      .send(todoItem)
      .set('Authorization', token)
      .then((res) => {
        expect(res.status).toBe(422)
        expect(res.body.message).toBe("title is required.")
      })
  })
});
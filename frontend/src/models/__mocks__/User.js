import BaseModel from "./BaseModel";

const fakeFnFetchUser = jest.fn(() => {
  return {
    id: 1,
    username: "user1",
    email: "user1@test.com",
    confirmed: true,
    role: { id: 1, name: "Authenticated" },
  };
});

export class User extends BaseModel {
  static api() {
    return {
      fetchUser: fakeFnFetchUser,
    };
  }
}

export default User;

import BaseModel from "./BaseModel";
import { Task } from "./Task";

export class User extends BaseModel {
  static entity = "users";

  static fields() {
    return {
      id: this.attr(null),
      username: this.attr(""),
      password: this.attr(""),
      email: this.attr(""),
      confirmed: this.boolean(false),
      tasks: this.hasMany(Task, "user_id")
    };
  }

  static get isLoggedIn() {
    return localStorage.getItem("jwt-token") !== null;
  }

  static apiConfig = {
    actions: {
      async load() {
        return this.get(`/users/me`);
      },

      logIn(identifier, password) {
        return this.post(
          "/auth/local",
          { identifier, password },
          {
            dataTransformer: (response) => {
              const { jwt, user } = response.data;

              localStorage.setItem("jwt-token", jwt);

              return user;
            },
          }
        );
      },
    },
  };
}

export default User;

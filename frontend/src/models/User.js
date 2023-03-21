import { Model } from "@vuex-orm/core";

export class User extends Model {
  static entity = "users";

  static fields() {
    return {
      id: this.attr(null),
      username: this.attr(""),
      password: this.attr(""),
      email: this.attr(""),
      confirmed: this.boolean(false),
    };
  }

  static get isLoggedIn() {
    let example = "make changes";

    console.log(example);

    return localStorage.getItem("jwt-token") !== null;
  }

  static get globalApiConfig() {
    const headers = {};

    const jwtToken = localStorage.getItem("jwt-token");

    if (jwtToken) {
      headers.Authorization = `Bearer ${jwtToken}`;
    }

    return {
      headers,
    };
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

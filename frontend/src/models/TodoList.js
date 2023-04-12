import { Model } from "@vuex-orm/core";
import User from "./User";

export class TodoList extends Model {
  static entity = "todolists";

  static fields() {
    return {
      id: this.attr(null),
      title: this.string(""),
      description: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),
      userId: this.attr(null),
      user: this.belongsTo(User, "userId"),
    };
  }

  get readableCreatedAt() {
    return new Date(this.created_at).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  }

  static get globalApiConfig() {
    const headers = {};

    const jwtToken = localStorage.getItem("jwt");

    if (jwtToken !== null) {
      headers.Authorization = `Bearer ${jwtToken}`;
    }

    return {
      headers,
    };
  }

  static apiConfig = {
    actions: {
      async getUserTask() {
        await this.get(`/my/todo-list-items`);
      },
      async updateUserTask(payload) {
        let id = payload.id;
        await this.put(`/my/todo-list-items/${id}`, {
          title: payload.title,
          description: payload.description,
        });
      },
      createUserTask(payload) {
        return this.post(`/my/todo-list-items`, payload);
      },
      deleteUserTask(payload) {
        const id = payload.id;
        return this.delete(`/my/todo-list-items/${id}`, { delete: id });
      },
    },
  };
}
export default TodoList;

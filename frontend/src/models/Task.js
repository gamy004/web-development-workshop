import BaseModel from "./BaseModel";
import User from "./User";

export class Task extends BaseModel {
  static entity = "Tasks";

  static fields() {
    return {
      id: this.attr(null),
      title: this.attr(""),
      description: this.attr(null),
      user_id: this.attr(null),
      user: this.belongsTo(User, "user_id"),
    };
  }

  static apiConfig = {
    actions: {
      async fetch() {
        return this.get(`/my/todo-lists`);
      },

      async create(title, description = null) {
        return this.post(`/my/todo-lists`, { title, description });
      },

      async update(id, title, description = null) {
        return this.put(`/my/todo-lists/${id}`, { title, description });
      },

      async remove(id) {
        return this.delete(`/my/todo-lists/${id}`, { delete: id });
      },
    },
  };
}

export default User;

import { Model } from "@vuex-orm/core";
import { TodoList } from "./TodoList";

export default class User extends Model {
	static entity = "user";

	static fields() {
		return {
			id: this.attr(null),
			username: this.attr(""),
			email: this.attr(""),
			provider: this.attr(""),
			confirmed: this.boolean(false),
			blocked: this.boolean(false),
			role: this.attr(null),
			created_at: this.attr(null),
			updated_at: this.attr(null),
			todoLists: this.hasMany(TodoList, "user_id"),
		};
	}
}

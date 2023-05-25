import { Model } from "@vuex-orm/core";
import User from "@/models/User";

export default class TodoList extends Model {
	static entity = "todolist";

	static fields() {
		return {
			id: this.attr(null),
			title: this.attr(""),
			description: this.attr(null),
			user_id: this.attr(null),
			user: this.belongsTo(User, "user_id"),
		};
	}

	static get globalApiConfig() {
		const headers = {};

		const accessToken = this.store().getters["authentication/accessToken"];

		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		return {
			headers,
		};
	}

	static apiConfig = {
		actions: {
			async fetch() {
				return this.get(`/my/todo-list-items`, { persistBy: "create" });
			},

			async create(title, description = null) {
				return this.post(`/my/todo-list-items`, { title, description });
			},

			async update(id, title, description = null) {
				return this.put(`/my/todo-list-items/${id}`, { title, description });
			},

			async remove(id) {
				return this.delete(`/my/todo-list-items/${id}`);
			},
		},
	};
}

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";

import authentication from "./modules/authentication";
import TodoList from "./models/TodoList";
import User from "./models/User";

Vue.use(Vuex);

const database = new VuexORM.Database();

VuexORM.use(VuexORMAxios, {
	axios: axios.create({
		baseURL: process.env.VUE_APP_BASE_URL,
		withCredentials: true,
	}),
});

database.register(TodoList);
database.register(User);

const vuexORMPlugin = VuexORM.install(database);

const store = new Vuex.Store({
	plugins: [vuexORMPlugin],
	modules: {
		authentication: authentication,
	},
});

export default store;

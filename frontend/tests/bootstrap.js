import { createLocalVue } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faInfo, faTableList } from "@fortawesome/free-solid-svg-icons";

// import Vuex from "vuex";
// import axios from "axios";
// import VuexORM from "@vuex-orm/core";
// import VuexORMAxios from "@vuex-orm/plugin-axios";
// import User from "../src/models/User";
// import Role from "../src/models/Role";
// import Todo from "../src/models/TodoList";

const localVue = createLocalVue();

// localVue.use(Vuex);

// const database = new VuexORM.Database();

// // Register Models.
// database.register(User)
// database.register(Role)
// database.register(Todo)

// VuexORM.use(VuexORMAxios, {
//   axios: axios.create({
//     baseURL: "/",
//     withCredentials: true,
//   }),
// });

// const vuexORMPlugin = VuexORM.install(database);

// const store = new Vuex.Store({
//   plugins: [vuexORMPlugin],
// });

localVue.use(BootstrapVue);

localVue.use(VueRouter);

localVue.use(Vuelidate);

const router = new VueRouter();

localVue.component("font-awesome-icon", FontAwesomeIcon);

library.add([faHome, faInfo, faTableList]);

export { router, localVue };

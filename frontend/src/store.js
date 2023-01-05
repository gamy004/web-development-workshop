import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import User from '@/models/User'
import Role from '@/models/Role'
import Task from "./models/Task";


Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(User);

VuexORM.use(VuexORMAxios, {
  axios: axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: true,
  }),
});

const vuexORMPlugin = VuexORM.install(database);

database.register(User)
database.register(Role)
database.register(Task)

const store = new Vuex.Store({
  plugins: [vuexORMPlugin],
});

export default store;

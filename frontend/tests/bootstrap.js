import { createLocalVue } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";

const router = new VueRouter();

const createLocalVueInstance = (useVueRouter = true) => {
	const localVue = createLocalVue();

	localVue.use(BootstrapVue);
	if (useVueRouter) {
		localVue.use(VueRouter);
	}
	localVue.use(Vuelidate);
	localVue.use(Vuex);
	localVue.component("font-awesome-icon", FontAwesomeIcon);
	return localVue;
};

export { router, createLocalVueInstance };

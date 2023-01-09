import { createLocalVue } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);

localVue.use(VueRouter);

localVue.use(Vuelidate);

const router = new VueRouter();

localVue.component("font-awesome-icon", FontAwesomeIcon);

export { router, localVue };

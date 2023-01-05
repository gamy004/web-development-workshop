import { createLocalVue } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);

localVue.use(VueRouter);

const router = new VueRouter();

localVue.component("font-awesome-icon", FontAwesomeIcon);

export {
    router,
    localVue
};
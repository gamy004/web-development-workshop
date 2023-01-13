import Vuelidate from "vuelidate";
import { createLocalVue } from "@vue/test-utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEyeSlash,
  faHome,
  faInfo,
  faUser,
  faList,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

const localVue = createLocalVue();

localVue.use(BootstrapVue);

localVue.use(VueRouter);

localVue.use(Vuelidate);

const router = new VueRouter();

localVue.component("font-awesome-icon", FontAwesomeIcon);

library.add([faEye, faEyeSlash, faHome, faInfo, faUser, faList, faEdit, faTrash]);

export { router, localVue };

import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add([faEye, faEyeSlash, faHome, faInfo, faUser, faList, faEdit, faTrash]);

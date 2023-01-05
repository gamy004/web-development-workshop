import Vue from "vue";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import "./icon";
import store from "./store";
import router from "./router";
import App from "./App.vue";

Vue.use(Vuelidate);
Vue.use(BootstrapVue);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

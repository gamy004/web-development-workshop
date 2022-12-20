import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";

Vue.use(BootstrapVue);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

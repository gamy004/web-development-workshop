import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import router from "./router";
import App from "./App.vue";

Vue.use(BootstrapVue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

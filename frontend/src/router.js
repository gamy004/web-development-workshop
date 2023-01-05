import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",

  base: __dirname,

  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(
          /* webpackChunkName: "page--home" */
          "./views/home-page.vue"
        ),
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(
          
          "./views/about-page.vue"
        ),
    },
    {
      path: "/todo-list",
      name: "odo-list",
      component: () =>
        import(
          
          "./views/todo-list.vue"
        ),
    },

    // route guard redirect to home page, trigger when invalid path has been request for page
    { path: "*", name: "guard", redirect: "/" },
  ],
});

router.beforeEach(async (to, from, next) => {
  // hook that triggered after the router has been mounted current page
  console.log(to, from);
  return next();
});

router.afterEach(async (to, from) => {
  // hook that triggered after the router has been mounted current page
  console.log(to, from);
});

export default router;

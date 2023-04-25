import Vue from "vue";
import Router from "vue-router";
import { User } from "./models";

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
      meta: {
        authorized: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "page--about" */
          "./views/about-page.vue"
        ),
    },
    {
      path: "/todolist",
      name: "todolist",
      meta: {
        authorized: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "page--about" */
          "./views/todolist-page.vue"
        ),
    },
    // route guard redirect to home page, trigger when invalid path has been request for page
    { path: "*", name: "guard", redirect: "/" },
  ],
});

router.beforeEach(async (to, from, next) => {
  // hook that triggered after the router has been mounted current page
  console.log(to, from, User.isLoggedIn());
  if (to.meta.authorized && !User.isLoggedIn()) {
    return next({ path: "/" });
  }

  return next();
});

router.afterEach(async (to, from) => {
  // hook that triggered after the router has been mounted current page
  console.log(to, from);
});

export default router;

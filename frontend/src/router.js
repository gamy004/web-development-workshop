import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const router = new Router({
	mode: "history",

	base: __dirname,

	routes: [
		{
			path: "/",
			name: "home",
			meta: {
				title: "Home",
				requiredAuthenticated: false,
			},
			component: () => import("./views/home-page.vue"),
		},
		{
			path: "/about",
			name: "about",
			meta: {
				title: "About",
				requiredAuthenticated: true,
			},
			component: () => import("./views/about-page.vue"),
		},
		{
			path: "/todo-list",
			name: "todo-list",
			meta: {
				title: "Todo List",
				requiredAuthenticated: true,
			},
			component: () => import("./views/todo-list-page.vue"),
		},
		{
			path: "auth",
			name: "auth",
			redirect: "/",
		},

		// route guard redirect to home page, trigger when invalid path has been request for page
		{ path: "*", name: "fallback", redirect: "/" },
	],
});

router.beforeEach(async (to, from, next) => {
	// hook that triggered after the router has been mounted current page
	let isAuthenticated = store.getters["authentication/isAuthenticated"] ?? false;
	let requiredAuthenticated = to.matched.some((routeMatched) => routeMatched.meta.requiredAuthenticated);

	if (!requiredAuthenticated || isAuthenticated) return next();
});

router.afterEach(async (to) => {
	// hook that triggered after the router has been mounted current page
	Vue.nextTick(() => {
		document.title = to.meta.title;
	});
});

export default router;

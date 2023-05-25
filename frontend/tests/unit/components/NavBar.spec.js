import { shallowMount } from "@vue/test-utils";
import { router, createLocalVueInstance } from "../../bootstrap";
import Vuex from "vuex";
import NavBar from "@/components/NavBar";
import Authentication from "@/modules/authentication";
import AuthUser from "@/models/AuthUser";
import flushPromises from "flush-promises";

describe("TitleLocation.vue: use VueRouter", () => {
	const localVue = createLocalVueInstance();
	const state = {
		user: null,
		accessToken: null,
	};
	const store = new Vuex.Store({
		modules: {
			authentication: {
				state,
				getters: Authentication.getters,
				namespaced: true,
			},
		},
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should display navbar when not authenticated.", () => {
		const wrapper = shallowMount(NavBar, {
			router,
			localVue,
			store,
		});

		let homeNavItem = wrapper.findComponent({
			ref: "home-navItem",
		});
		expect(homeNavItem.exists()).toBeTruthy();

		let aboutNav = wrapper.findComponent({
			ref: "about-navItem",
		});
		expect(aboutNav.exists()).toBeFalsy();

		let todoListNav = wrapper.findComponent({
			ref: "todo-list-navItem",
		});
		expect(todoListNav.exists()).toBeFalsy();

		let signInBtn = wrapper.findComponent({
			ref: "signInBtn",
		});
		expect(signInBtn.exists()).toBeTruthy();

		let signOutBtn = wrapper.findComponent({
			ref: "signOutBtn",
		});
		expect(signOutBtn.exists()).toBeFalsy();
	});

	it("should display navbar when authenticated.", () => {
		state.user = new AuthUser({ id: 1, username: "test", email: "test@mail.com" });
		state.accessToken = "token";

		const wrapper = shallowMount(NavBar, {
			router,
			localVue,
			store,
		});

		let homeNavItem = wrapper.findComponent({
			ref: "home-navItem",
		});
		expect(homeNavItem.exists()).toBeTruthy();

		let aboutNav = wrapper.findComponent({
			ref: "about-navItem",
		});
		expect(aboutNav.exists()).toBeTruthy();

		let todoListNav = wrapper.findComponent({
			ref: "todo-list-navItem",
		});
		expect(todoListNav.exists()).toBeTruthy();

		let signInBtn = wrapper.findComponent({
			ref: "signInBtn",
		});
		expect(signInBtn.exists()).toBeFalsy();

		let signOutBtn = wrapper.findComponent({
			ref: "signOutBtn",
		});
		expect(signOutBtn.exists()).toBeTruthy();
	});
});

describe("TitleLocation.vue: use mock router", () => {
	const localVue = createLocalVueInstance(false);
	const state = {
		user: null,
		accessToken: null,
	};
	const actions = {
		signOut: jest.fn().mockImplementation(() => {
			state.user = null;
			state.accessToken = null;
		}),
	};
	const store = new Vuex.Store({
		modules: {
			authentication: {
				state,
				actions,
				getters: Authentication.getters,
				namespaced: true,
			},
		},
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should redirect to home page when click sign in button.", async () => {
		let mockRoute = {
			path: "/anonymous-path",
			name: "anonymous",
		};

		let mockRouter = {
			push: jest.fn(),
		};

		state.user = null;
		state.accessToken = null;

		const wrapper = shallowMount(NavBar, {
			localVue,
			store,
			mocks: {
				$route: mockRoute,
				$router: mockRouter,
			},
		});

		let signInBtn = wrapper.findComponent({
			ref: "signInBtn",
		});

		await signInBtn.trigger("click");
		await flushPromises();

		expect(mockRouter.push).toHaveBeenCalledWith("home");

		mockRoute.path = "/home";
		mockRoute.name = "home";
		mockRouter.push.mockClear();

		await signInBtn.trigger("click");
		await flushPromises();

		expect(mockRouter.push).not.toHaveBeenCalled();
	});

	it("should redirect to home page when click sign out button.", async () => {
		let mockRoute = {
			path: "/anonymous-path",
			name: "anonymous",
		};

		let mockRouter = {
			push: jest.fn(),
		};

		state.user = new AuthUser({ email: "test@mail.com" });
		state.accessToken = "token";

		const wrapper = shallowMount(NavBar, {
			localVue,
			store,
			mocks: {
				$route: mockRoute,
				$router: mockRouter,
			},
		});

		let signOutBtn = wrapper.findComponent({
			ref: "signOutBtn",
		});

		await signOutBtn.trigger("click");
		await flushPromises();

		expect(actions.signOut).toHaveBeenCalled();
		expect(mockRouter.push).toHaveBeenCalledWith("home");

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.isAuthenticated).toBeFalsy();

		state.user = new AuthUser({ email: "test@mail.com" });
		state.accessToken = "token";
		mockRoute.path = "/home";
		mockRoute.name = "home";
		mockRouter.push.mockClear();
		await wrapper.vm.$nextTick();

		await signOutBtn.trigger("click");
		await flushPromises();

		expect(actions.signOut).toHaveBeenCalled();
		expect(mockRouter.push).not.toHaveBeenCalled();

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isAuthenticated).toBeFalsy();
	});
});

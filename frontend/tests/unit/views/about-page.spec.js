import { shallowMount } from "@vue/test-utils";
import { router, localVue } from "../../bootstrap";
import Vuex from "vuex";
import AboutPage from "@/views/about-page.vue";
import Authentication from "@/modules/authentication";
import User from "@/models/user";

describe("About Page", () => {
	let state;
	let store;

	beforeEach(() => {
		jest.clearAllMocks();

		state = {
			user: null,
			accessToken: null,
		};

		store = new Vuex.Store({
			modules: {
				authentication: {
					state,
					getters: Authentication.getters,
					namespaced: true,
				},
			},
		});
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should display content correctly with user", () => {
		state.user = new User({ id: 1, username: "test", email: "test@mail.com" });
		state.accessToken = "token";

		const wrapper = shallowMount(AboutPage, {
			router,
			localVue,
			store,
		});

		const pageName = wrapper.find(".page-name");
		expect(pageName.text()).toBe("About");

		const homeNav = wrapper.findAll(".nav-link").at(0);
		expect(homeNav.text()).toBe("Home");
		const aboutNav = wrapper.findAll(".nav-link").at(1);
		expect(aboutNav.text()).toBe("About");

		var userInfo = wrapper.findComponent({
			ref: "userInfo",
		});
		expect(userInfo.exists()).toBeTruthy();

		expect(wrapper.vm.currentUser.id).toBe(1);
		expect(wrapper.vm.currentUser.username).toBe("test");
		expect(wrapper.vm.currentUser.email).toBe("test@mail.com");
	});

	it("should display content correctly with no user", () => {
		state.user = null;
		state.accessToken = null;

		const wrapper = shallowMount(AboutPage, {
			router,
			localVue,
			store,
		});

		var userInfo = wrapper.findComponent({
			ref: "userInfo",
		});
		expect(userInfo.exists()).toBeFalsy();
	});

	it("should display content correctly when state change", async () => {
		state.user = null;
		state.accessToken = null;

		const wrapper = shallowMount(AboutPage, {
			router,
			localVue,
			store,
		});

		var userInfo = wrapper.findComponent({
			ref: "userInfo",
		});

		expect(userInfo.exists()).toBeFalsy();

		state.user = new User({ id: 2, username: "test2", email: "test2@mail.com" });
		state.accessToken = "token";

		await wrapper.vm.$nextTick();

		userInfo = wrapper.findComponent({
			ref: "userInfo",
		});

		expect(userInfo.exists()).toBeTruthy();
		expect(wrapper.vm.currentUser.id).toBe(2);
		expect(wrapper.vm.currentUser.username).toBe("test2");
		expect(wrapper.vm.currentUser.email).toBe("test2@mail.com");
	});
});

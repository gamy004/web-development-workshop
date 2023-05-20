import { shallowMount } from "@vue/test-utils";
import { router, localVue } from "../../bootstrap";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import HomePage from "@/views/home-page.vue";
import Authentication from "@/modules/authentication";
import User from "@/models/user";

describe("Home Page", () => {
	let actions;
	let state;
	let store;

	beforeEach(() => {
		jest.clearAllMocks();

		state = {
			user: null,
			accessToken: null,
		};

		actions = {
			signIn: jest.fn().mockResolvedValueOnce(),
			signOut: jest.fn(),
		};

		store = new Vuex.Store({
			modules: {
				authentication: {
					state,
					actions,
					getters: Authentication.getters,
					namespaced: true,
				},
			},
		});
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should display content correctly without cache", () => {
		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		const pageName = wrapper.find(".page-name");
		expect(pageName.text()).toBe("Home");

		const homeNav = wrapper.findAll(".nav-link").at(0);
		expect(homeNav.text()).toBe("Home");
		const aboutNav = wrapper.findAll(".nav-link").at(1);
		expect(aboutNav.text()).toBe("About");

		var signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeTruthy();

		var signOutForm = wrapper.findComponent({
			ref: "signOutForm",
		});
		expect(signOutForm.exists()).toBeFalsy();

		expect(wrapper.vm.$data.authenticationForm.email).toBeNull();
		expect(wrapper.vm.$data.authenticationForm.password).toBeNull();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(0);
	});

	it("should display content correctly with cache", () => {
		state.user = new User({ email: "test@mail.com" });
		state.accessToken = "token";

		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		const pageName = wrapper.find(".page-name");
		expect(pageName.text()).toBe("Home");

		const homeNav = wrapper.findAll(".nav-link").at(0);
		expect(homeNav.text()).toBe("Home");
		const aboutNav = wrapper.findAll(".nav-link").at(1);
		expect(aboutNav.text()).toBe("About");

		var signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeFalsy();

		var signOutForm = wrapper.findComponent({
			ref: "signOutForm",
		});
		expect(signOutForm.exists()).toBeTruthy();
	});

	it("should sign in correctly", async () => {
		state.user = null;
		state.accessToken = null;

		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		var signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeTruthy();

		var signOutForm = wrapper.findComponent({
			ref: "signOutForm",
		});
		expect(signOutForm.exists()).toBeFalsy();

		wrapper.vm.$data.authenticationForm = {
			email: "test@mail.com",
			password: "password",
		};

		await signInForm.trigger("submit");
		await flushPromises();

		expect(actions.signIn).toHaveBeenCalled();

		var errorContainer = wrapper.findComponent({
			ref: "errorContainer",
		});
		expect(errorContainer.exists()).toBeFalsy();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(0);

		expect(wrapper.vm.$data.authenticationForm.email).toBeNull();
		expect(wrapper.vm.$data.authenticationForm.password).toBeNull();

		state.user = new User({ email: "test@mail.com" });
		state.accessToken = "token";

		await wrapper.vm.$nextTick();

		signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeFalsy();

		signOutForm = wrapper.findComponent({
			ref: "signOutForm",
		});
		expect(signOutForm.exists()).toBeTruthy();
	});

	it("should sign out correctly", async () => {
		state.user = new User({ email: "test@mail.com" });
		state.accessToken = "token";

		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		var signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeFalsy();

		var signOutForm = wrapper.findComponent({
			ref: "signOutForm",
		});
		expect(signOutForm.exists()).toBeTruthy();

		await signOutForm.trigger("submit");
		await flushPromises();

		expect(actions.signOut).toHaveBeenCalled();

		var errorContainer = wrapper.findComponent({
			ref: "errorContainer",
		});
		expect(errorContainer.exists()).toBeFalsy();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(0);

		expect(wrapper.vm.$data.authenticationForm.email).toBeNull();
		expect(wrapper.vm.$data.authenticationForm.password).toBeNull();

		state.user = null;
		state.accessToken = "token";

		await wrapper.vm.$nextTick();

		signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeTruthy();

		signOutForm = wrapper.findComponent({
			ref: "signOutForm",
		});
		expect(signOutForm.exists()).toBeFalsy();
	});

	it("should display error when sign in with empty or invalid credential", async () => {
		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		// Empty credential
		var signInForm = wrapper.findComponent({
			ref: "signInForm",
		});
		expect(signInForm.exists()).toBeTruthy();

		await signInForm.trigger("submit");
		await flushPromises();
		await wrapper.vm.$nextTick();

		var errorContainer = wrapper.findComponent({
			ref: "errorContainer",
		});
		expect(errorContainer.exists()).toBeTruthy();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(2);
		expect(wrapper.vm.$data.errorMessages).toContain("Email is required.");
		expect(wrapper.vm.$data.errorMessages).toContain("Password is required.");

		// Invalid email and empty password
		wrapper.vm.$data.authenticationForm = {
			email: "test",
			password: null,
		};

		await signInForm.trigger("submit");
		await flushPromises();
		await wrapper.vm.$nextTick();

		var errorContainer = wrapper.findComponent({
			ref: "errorContainer",
		});
		expect(errorContainer.exists()).toBeTruthy();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(2);
		expect(wrapper.vm.$data.errorMessages).toContain("Email format invalid.");
		expect(wrapper.vm.$data.errorMessages).toContain("Password is required.");

		// empty email and password
		wrapper.vm.$data.authenticationForm = {
			email: null,
			password: "password",
		};

		await signInForm.trigger("submit");
		await flushPromises();
		await wrapper.vm.$nextTick();

		var errorContainer = wrapper.findComponent({
			ref: "errorContainer",
		});
		expect(errorContainer.exists()).toBeTruthy();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(1);
		expect(wrapper.vm.$data.errorMessages).toContain("Email is required.");

		// valid email and empty password
		wrapper.vm.$data.authenticationForm = {
			email: "test@mail.com",
			password: null,
		};

		await signInForm.trigger("submit");
		await flushPromises();
		await wrapper.vm.$nextTick();

		var errorContainer = wrapper.findComponent({
			ref: "errorContainer",
		});
		expect(errorContainer.exists()).toBeTruthy();
		expect(wrapper.vm.$data.errorMessages).toHaveLength(1);
		expect(wrapper.vm.$data.errorMessages).toContain("Password is required.");
	});
});

import { shallowMount } from "@vue/test-utils";
import { router, createLocalVueInstance } from "../../bootstrap";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import HomePage from "@/views/home-page.vue";
import Authentication from "@/modules/authentication";
import AuthUser from "@/models/AuthUser";

describe("Home Page", () => {
	const localVue = createLocalVueInstance();
	const state = {
		user: null,
		accessToken: null,
	};
	const actions = {
		signIn: jest.fn().mockResolvedValueOnce(),
		signOut: jest.fn(),
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

	it("should display content correctly without cache", () => {
		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		const pageName = wrapper.find(".page-name");
		expect(pageName.text()).toBe("Home");

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
		state.user = new AuthUser({ email: "test@mail.com" });
		state.accessToken = "token";

		const wrapper = shallowMount(HomePage, {
			router,
			localVue,
			store,
		});

		const pageName = wrapper.find(".page-name");
		expect(pageName.text()).toBe("Home");

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

		state.user = new AuthUser({ email: "test@mail.com" });
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
		state.user = new AuthUser({ email: "test@mail.com" });
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

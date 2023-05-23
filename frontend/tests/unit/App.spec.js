import { shallowMount } from "@vue/test-utils";
import { router, createLocalVueInstance } from "../bootstrap";
import Vuex from "vuex";
import App from "../../src/App.vue";

describe("App.vue", () => {
	const localVue = createLocalVueInstance();
	const actions = {
		init: jest.fn().mockResolvedValueOnce(),
	};
	const store = new Vuex.Store({
		modules: {
			authentication: {
				actions,
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

	it("should display welcome card", () => {
		const wrapper = shallowMount(App, {
			router,
			localVue,
			store,
		});

		const cardWelcome = wrapper.findComponent({ ref: "card__welcome" });

		expect(cardWelcome.exists()).toBeTruthy();
	});
});

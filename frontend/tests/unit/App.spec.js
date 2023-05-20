import { mount } from "@vue/test-utils";
import { router, localVue } from "../bootstrap";
import Vuex from "vuex";
import App from "../../src/App.vue";

describe("App.vue", () => {
	let actions;
	let store;

	beforeEach(() => {
		jest.clearAllMocks();

		actions = {
			init: jest.fn().mockResolvedValueOnce(),
		};

		store = new Vuex.Store({
			modules: {
				authentication: {
					actions,
					namespaced: true,
				},
			},
		});
	});

	it("renders props.msg when passed", () => {
		const title = `Welcome to Learn4Life Workshop!!`;

		const wrapper = mount(App, {
			router,
			localVue,
			store,
		});

		const cardWelcome = wrapper.findComponent({ ref: "card__welcome" });

		expect(cardWelcome.text()).toContain(title);
	});

	it("should init authentication vuex module", () => {
		mount(App, {
			router,
			localVue,
			store,
		});

		expect(actions.init).toHaveBeenCalled();
	});
});

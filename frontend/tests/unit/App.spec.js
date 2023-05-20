import { mount } from "@vue/test-utils";
import { router, localVue } from "../bootstrap";
import App from "../../src/App.vue";

describe("App.vue", () => {
	let methods = {};

	beforeEach(() => {
		methods.init = jest.spyOn(App.methods, "init").mockResolvedValueOnce();
	});

	it("renders props.msg when passed", () => {
		const title = `Welcome to Learn4Life Workshop!!`;

		const wrapper = mount(App, {
			router,
			localVue,
		});

		const cardWelcome = wrapper.findComponent({ ref: "card__welcome" });

		expect(cardWelcome.text()).toContain(title);
	});

	it("should init authentication vuex module", () => {
		mount(App, {
			router,
			localVue,
		});

		expect(methods.init).toHaveBeenCalled();
	});
});

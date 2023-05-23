import { shallowMount } from "@vue/test-utils";
import { createLocalVueInstance } from "../../bootstrap";
import TitleLocation from "@/components/TitleLocation";

describe("TitleLocation.vue", () => {
	const localVue = createLocalVueInstance(false);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should display current route.", () => {
		const mockRoute = {
			path: "/path-1",
		};

		const wrapper = shallowMount(TitleLocation, {
			localVue,
			mocks: {
				$route: mockRoute,
			},
		});

		let locationCard = wrapper.findComponent({
			ref: "locationCard",
		});
		expect(locationCard.exists()).toBeTruthy();
		expect(wrapper.vm.currentLocation).toEqual(`${window.location.origin}/path-1`);

		mockRoute.path = "/path-2";
		expect(wrapper.vm.currentLocation).toEqual(`${window.location.origin}/path-2`);
	});
});

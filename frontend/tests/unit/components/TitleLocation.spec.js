import { shallowMount } from "@vue/test-utils";
import { router, localVue } from "../../bootstrap";
import TitleLocation from "@/components/TitleLocation.vue";

describe("TitleLocation.vue", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    it("should display correct location when component mounted", async () => {
        await router.push("/mock-route");

        const wrapper = shallowMount(TitleLocation, {
            router,
            localVue
        });

        const textLocation = wrapper.findComponent({ ref: "text__location" });

        expect(textLocation).toBeDefined();

        expect(textLocation.text()).toBe(`${window.location.origin}/mock-route`);
        expect(wrapper.vm.currentLocation).toBe(`${window.location.origin}/mock-route`);
    });

    it("should display correct location when route changed", async () => {
        const wrapper = shallowMount(TitleLocation, {
            router,
            localVue
        });

        await router.push("/mock-route-2");

        const textLocation = wrapper.findComponent({ ref: "text__location" });

        expect(textLocation).toBeDefined();

        expect(textLocation.text()).toBe(`${window.location.origin}/mock-route-2`);
        expect(wrapper.vm.currentLocation).toBe(`${window.location.origin}/mock-route-2`);

    });
});

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

    it("should display current location", async () => {
        await router.push("/mock-route");

        const wrapper = shallowMount(TitleLocation, {
            router,
            localVue
        });

        const textLocation = wrapper.findComponent({ ref: "text__location" });

        expect(textLocation).toBeDefined();

        expect(textLocation.text()).toBe(`${window.location.origin}/mock-route`);
    });

    it("should display correct location when route change", async () => {
        const wrapper = shallowMount(TitleLocation, {
            router,
            localVue
        });

        await router.push("/mock-route-2");

        const textLocation = wrapper.findComponent({ ref: "text__location" });

        expect(textLocation).toBeDefined();

        expect(textLocation.text()).toBe(`${window.location.origin}/mock-route-2`);

    });
});

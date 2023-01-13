import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { router, localVue } from "../../bootstrap";
import Modal from "@/components/Modal.vue";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("components/Modal.vue", () => {
  it("should close modal when form is submitted with synchonous method", async () => {
    const onSubmitSpy = jest.spyOn(Modal.methods, "onSubmit");
    const onHiddenSpy = jest.spyOn(Modal.methods, "onHidden");

    const wrapper = mount(Modal, {
      router,
      localVue,
      propsData: {
        showModal: true
      }
    });

    const form = wrapper.findComponent({
      ref: "modal-form",
    });

    form.trigger("submit");
    
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(onHiddenSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().hidden).toBeTruthy();
    expect(wrapper.vm.$data.showModalData).toBeFalsy();
  });

  it("should close modal when form is submitted with asynchonous method", async () => {
    const onSubmitSpy = jest.spyOn(Modal.methods, "onSubmit");
    const onHiddenSpy = jest.spyOn(Modal.methods, "onHidden");

    const wrapper = mount(Modal, {
      router,
      localVue,
      propsData: {
        showModal: true,
        provider: async (data) => {
            console.log("provider was called", data);
            return Promise.resolve({ response: { data: { status: "success" }}});
        }
      }
    });

    const form = wrapper.findComponent({
      ref: "modal-form",
    });

    await form.trigger("submit");

    await flushPromises();

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    expect(onHiddenSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().hidden).toBeTruthy();

    expect(wrapper.vm.$data.showModalData).toBeFalsy();
  });
});

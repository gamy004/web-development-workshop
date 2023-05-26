import { shallowMount } from "@vue/test-utils";
import { router, createLocalVueInstance } from "../../bootstrap";
import AuthUser from "@/models/AuthUser";
import store from "@/store";
import MockAdapter from "axios-mock-adapter";
import TodoList from "@/models/TodoList";
import TodoListItemModal from "@/components/TodoListItemModal.vue";

describe("TodoListItemModal", () => {
	const localVue = createLocalVueInstance();

	const mockUserData = { id: 1, username: "testuser", email: "test@mail.com" };
	const mockOnCreateData = {
		id: 1,
		title: "Task 1",
		description: "Task1's description",
		user: 1,
	};

	const mockOnUpdateData = {
		id: 1,
		title: "Task 1 (edit)",
		description: "Task1's description",
		user: 1,
	};

	store.commit("authentication/setUser", new AuthUser(mockUserData));
	store.commit("authentication/setAccessToken", "token");

	const mockAxios = new MockAdapter(TodoList.axios);

	mockAxios
		.onPost(`/my/todo-list-items`, {
			title: mockOnCreateData.title,
			description: mockOnCreateData.description,
		})
		.reply(200, mockOnCreateData);

	mockAxios
		.onPut(`/my/todo-list-items/${mockOnUpdateData.id}`, {
			title: mockOnUpdateData.title,
			description: mockOnUpdateData.description,
		})
		.reply(200, mockOnUpdateData);

	mockAxios.onDelete(`/my/todo-list-items/1`).reply(200);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
		mockAxios.restore();
	});

	it("should initial", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		expect(wrapper.vm.$data.todoListItemId).toBeNull();
		expect(wrapper.vm.$data.submitting).toBeFalsy();
		expect(wrapper.vm.$data.deleting).toBeFalsy();
		expect(wrapper.vm.$data.todoList).toBeDefined();
	});

	it("should open create modal", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.open();

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.todoListItemId).toBeNull();
		expect(wrapper.vm.modalTitle).toBe(`Create todo list item`);
		expect(wrapper.vm.$data.todoList.title).toBe("");
		expect(wrapper.vm.$data.todoList.description).toBeNull();
	});

	it("should open edit modal", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.open(1, {
			id: 1,
			title: "task",
			description: "description",
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$data.todoListItemId).toBe(1);
		expect(wrapper.vm.modalTitle).toBe(`Edit todo list item`);
		expect(wrapper.vm.$data.todoList.title).toBe("task");
		expect(wrapper.vm.$data.todoList.description).toBe("description");
	});

	it("should submit todo list on create", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.$data.todoListItemId = null;
		wrapper.vm.$data.todoList.title = mockOnCreateData.title;
		wrapper.vm.$data.todoList.description = mockOnCreateData.description;

		let eventEmit = jest.spyOn(wrapper.vm, "$emit");

		await wrapper.vm.$nextTick();

		await wrapper.vm.onSubmitHandler();

		expect(eventEmit).toHaveBeenCalledWith("onSubmited");
	});

	it("should submit todo list on update", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.$data.todoListItemId = mockOnUpdateData.id;
		wrapper.vm.$data.todoList.title = mockOnUpdateData.title;
		wrapper.vm.$data.todoList.description = mockOnUpdateData.description;

		let eventEmit = jest.spyOn(wrapper.vm, "$emit");

		await wrapper.vm.$nextTick();

		await wrapper.vm.onSubmitHandler();

		expect(eventEmit).toHaveBeenCalledWith("onSubmited");
	});

	it("should validator error on submit", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.$data.todoList.title = "";
		wrapper.vm.$data.todoList.description = null;

		await wrapper.vm.$nextTick();

		await wrapper.vm.onSubmitHandler();

		expect(wrapper.vm.$v.todoList.$invalid).toBeTruthy();
	});

	it("should delete todo list item", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.$data.todoListItemId = 1;

		let eventEmit = jest.spyOn(wrapper.vm, "$emit");

		await wrapper.vm.$nextTick();

		await wrapper.vm.onDeleteHandler();

		expect(eventEmit).toHaveBeenCalledWith("onDeleted");
	});

	it("should reset state", async () => {
		const wrapper = shallowMount(TodoListItemModal, {
			router,
			localVue,
			store,
		});

		wrapper.vm.$data.todoListItemId = 1;
		wrapper.vm.$data.todoList.title = mockOnUpdateData.title;
		wrapper.vm.$data.todoList.description = mockOnUpdateData.description;

		await wrapper.vm.$nextTick();

		await wrapper.vm.resetModel();

		expect(wrapper.vm.$data.todoListItemId).toBeNull();
		expect(wrapper.vm.$data.todoList.title).toBe("");
		expect(wrapper.vm.$data.todoList.description).toBeNull();
	});
});

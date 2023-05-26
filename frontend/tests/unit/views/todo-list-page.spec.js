import { shallowMount } from "@vue/test-utils";
import { router, createLocalVueInstance } from "../../bootstrap";
import flushPromises from "flush-promises";
import AuthUser from "@/models/AuthUser";
import store from "@/store";
import TodoListPage from "@/views/todo-list-page.vue";
import MockAdapter from "axios-mock-adapter";
import TodoList from "@/models/TodoList";
import TodoListItemModal from "@/components/TodoListItemModal.vue";

describe("Todo List Page", () => {
	const localVue = createLocalVueInstance();

	const mockUserData = { id: 1, username: "testuser", email: "test@mail.com" };
	const mockTodoListData = [
		{
			id: 1,
			title: "Task 1",
			description: "Task1's description",
			user: 1,
		},
		{
			id: 2,
			title: "Task 2",
			description: null,
			user: 1,
		},
	];

	store.commit("authentication/setUser", new AuthUser(mockUserData));
	store.commit("authentication/setAccessToken", "token");

	const mockAxios = new MockAdapter(TodoList.axios);

	mockAxios.onGet("/my/todo-list-items").reply(200, mockTodoListData);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should display todo list", async () => {
		const wrapper = shallowMount(TodoListPage, {
			router,
			localVue,
			store,
		});

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.todoList.length).toBe(2);

		const todoListItemGroups = wrapper.findAllComponents({
			ref: "todoListItem",
		});

		expect(todoListItemGroups.length).toBe(2);
	});

	it("should open create modal", async () => {
		const wrapper = shallowMount(TodoListPage, {
			router,
			localVue,
			store,
			stubs: {
				TodoListItemModal,
			},
		});

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		const modalContainer = wrapper.findComponent(TodoListItemModal);
		const mockOpen = jest.spyOn(modalContainer.vm, "open");

		const createBtn = wrapper.findComponent({
			ref: "craeteBtn",
		});
		await createBtn.trigger("click");
		await flushPromises();
		expect(mockOpen).toHaveBeenCalled();
	});

	it("should open edit modal", async () => {
		const wrapper = shallowMount(TodoListPage, {
			router,
			localVue,
			store,
			stubs: {
				TodoListItemModal,
			},
		});

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		const modalContainer = wrapper.findComponent(TodoListItemModal);
		const mockOpen = jest.spyOn(modalContainer.vm, "open");

		const editBtn = wrapper.findComponent({
			ref: "editBtn",
		});
		await editBtn.trigger("click");
		await flushPromises();
		expect(mockOpen).toHaveBeenCalledWith(wrapper.vm.todoList[0].id, wrapper.vm.todoList[0]);
	});

	it("should open delete modal", async () => {
		const wrapper = shallowMount(TodoListPage, {
			router,
			localVue,
			store,
			stubs: {
				TodoListItemModal,
			},
		});

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		const modalContainer = wrapper.findComponent(TodoListItemModal);
		const mockOpen = jest.spyOn(modalContainer.vm, "delete");

		const deleteBtn = wrapper.findComponent({
			ref: "deleteBtn",
		});
		await deleteBtn.trigger("click");
		await flushPromises();
		expect(mockOpen).toHaveBeenCalledWith(wrapper.vm.todoList[0].id);
	});

	it("should trigger subject for reload todo list when modal resolve action", async () => {
		const wrapper = shallowMount(TodoListPage, {
			router,
			localVue,
			store,
			stubs: {
				TodoListItemModal,
			},
		});

		const modalContainer = wrapper.findComponent(TodoListItemModal);

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		// for test todolist change
		mockTodoListData.push({
			id: 3,
			title: "Task 3",
			description: null,
			user: 1,
		});

		modalContainer.vm.$emit("onSubmited");

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.todoList.length).toBe(3);

		let todoListItemGroups = wrapper.findAllComponents({
			ref: "todoListItem",
		});

		expect(todoListItemGroups.length).toBe(3);

		// for test todolist change
		mockTodoListData.pop();

		modalContainer.vm.$emit("onDeleted");

		// next tick for subject next()
		await wrapper.vm.$nextTick();

		// next tick for todoList change
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.todoList.length).toBe(2);

		todoListItemGroups = wrapper.findAllComponents({
			ref: "todoListItem",
		});

		expect(todoListItemGroups.length).toBe(2);
	});
});

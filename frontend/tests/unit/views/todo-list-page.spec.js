import { shallowMount } from "@vue/test-utils";
import { router, createLocalVueInstance } from "../../bootstrap";
import flushPromises from "flush-promises";
import AuthUser from "@/models/AuthUser";
import store from "@/store";
import TodoListPage from "@/views/todo-list-page.vue";
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
			computed: {
				currentUser() {
					return new AuthUser(mockUserData);
				},
				todoList() {
					return mockTodoListData;
				},
			},
		});

		const todoListItem = wrapper.findAllComponents({
			ref: "todoListItem",
		});

		expect(todoListItem.length).toBe(2);
	});
});

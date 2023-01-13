jest.mock("@/models/User");
jest.mock("@/models/Task");
import flushPromises from "flush-promises";
import { mount, shallowMount } from "@vue/test-utils";
import { router, localVue } from "../../bootstrap";
import TodoListPage from "@/views/todo-list-page.vue";
import { User } from "@/models/User";
import { Task } from "@/models/Task";
import { TRUE } from "sass";

beforeEach(() => {
  jest.clearAllMocks();
});

const mockUserData = {
  id: 1,
  username: "testuser",
  email: "test@mail.com",
};

const mockTaskData = [
  {
    id: 1,
    title: "Task 1",
    description: "Task1's description",
    user: 1,
  },
  {
    id: 2,
    title: "Task 2",
    description: "",
    user: 1,
  },
];

describe("views/todo-list-page.vue", () => {
  it("should display create todo list item button and set data to display modal when click", async () => {
    User.api().load.mockImplementation(() => ({
      response: {
        data: mockUserData,
      },
    }));

    const mockUser = new User(mockUserData);

    Task.api().fetch.mockImplementation(() => ({
      response: {
        data: [],
      },
    }));

    mockUser.tasks = [];

    const wrapper = shallowMount(TodoListPage, {
      router,
      localVue,
      computed: {
        user() {
          return mockUser;
        },
      },
    });

    await flushPromises();

    const buttonCreateTask = wrapper.findComponent({
      ref: "button__create-task",
    });

    expect(buttonCreateTask.exists()).toBeTruthy();

    expect(buttonCreateTask.text()).toContain("Add task");

    // Test click event should change data varaible from `false` => `to`
    expect(wrapper.vm.$data.showManageModal).toBeFalsy();

    await buttonCreateTask.trigger("click");

    expect(wrapper.vm.$data.showManageModal).toBeTruthy();
  });

  it("should display todo list item of given user with title, description, edit button and delete button", async () => {
    User.api().load.mockImplementation(() => ({
      response: {
        data: mockUserData,
      },
    }));

    const mockUser = new User(mockUserData);

    Task.api().fetch.mockImplementation(() => ({
      response: {
        data: mockTaskData,
      },
    }));

    const mockTasks = mockTaskData.map((data) => new Task(data));

    mockUser.tasks = mockTasks;

    const wrapper = shallowMount(TodoListPage, {
      router,
      localVue,
      computed: {
        user() {
          return mockUser;
        },
      },
    });

    await flushPromises();

    expect(User.api().load).toHaveBeenCalledTimes(1);

    expect(Task.api().fetch).toHaveBeenCalledTimes(1);

    const todoList = wrapper.findComponent({ ref: "todo__list" });

    expect(todoList.exists()).toBeTruthy();

    const todoListItems = wrapper.findAllComponents({
      ref: "todo__list-item",
    });

    expect(todoListItems.length).toBe(2);

    const task1 = wrapper.find("#task-1");

    expect(task1.exists()).toBeTruthy();
    expect(task1.find(".header__task").text()).toContain("Task 1");
    expect(task1.find(".description__task").text()).toContain(
      "Task1's description"
    );

    const task1EditButton = task1.find(".button__edit-task");

    expect(task1EditButton.exists()).toBeTruthy();
    expect(task1EditButton.text()).toContain("Edit");

    const task2 = wrapper.find("#task-2");

    expect(task2.exists()).toBeTruthy();
    expect(task2.find(".header__task").text()).toContain("Task 2");
    expect(task2.find(".description__task").text()).toBe("");

    const task2DeleteButton = task2.find(".button__delete-task");

    expect(task2DeleteButton.exists()).toBeTruthy();
    expect(task2DeleteButton.text()).toContain("Delete");
  });

  it("should display manage modal and set form data when edit todo list item", async () => {
    User.api().load.mockImplementation(() => ({
      response: {
        data: mockUserData,
      },
    }));

    const mockUser = new User(mockUserData);

    Task.api().fetch.mockImplementation(() => ({
      response: {
        data: mockTaskData,
      },
    }));

    const mockTasks = mockTaskData.map((data) => new Task(data));

    mockUser.tasks = mockTasks;

    const wrapper = shallowMount(TodoListPage, {
      router,
      localVue,
      computed: {
        user() {
          return mockUser;
        },
      },
    });

    await flushPromises();

    const task1 = wrapper.find("#task-1");
    const task1EditButton = task1.find(".button__edit-task");

    expect(wrapper.vm.$data.showManageModal).toBeFalsy();
    expect(wrapper.vm.$data.edittedTaskId).toBeNull();
    expect(wrapper.vm.$data.task.title).toBe("");
    expect(wrapper.vm.$data.task.description).toBeNull();

    await task1EditButton.trigger("click");

    expect(wrapper.vm.$data.showManageModal).toBeTruthy();
    expect(wrapper.vm.$data.edittedTaskId).toBe(1);
    expect(wrapper.vm.$data.task.title).toBe("Task 1");
    expect(wrapper.vm.$data.task.description).toBe("Task1's description");
  });

  it("should display delete modal and set deleted id of todo list item when delete todo list item", async () => {
    User.api().load.mockImplementation(() => ({
      response: {
        data: mockUserData,
      },
    }));

    const mockUser = new User(mockUserData);

    Task.api().fetch.mockImplementation(() => ({
      response: {
        data: mockTaskData,
      },
    }));

    const mockTasks = mockTaskData.map((data) => new Task(data));

    mockUser.tasks = mockTasks;

    const wrapper = shallowMount(TodoListPage, {
      router,
      localVue,
      computed: {
        user() {
          return mockUser;
        },
      },
    });

    await flushPromises();

    const task1 = wrapper.find("#task-1");
    const task1DeleteButton = task1.find(".button__delete-task");

    expect(wrapper.vm.$data.showDeleteModal).toBeFalsy();
    expect(wrapper.vm.$data.deletedTaskId).toBeNull();

    await task1DeleteButton.trigger("click");

    expect(wrapper.vm.$data.showDeleteModal).toBeTruthy();
    expect(wrapper.vm.$data.deletedTaskId).toBe(1);
  });

  it("should submit form", async () => {
    User.api().load.mockImplementation(() => ({
      response: {
        data: mockUserData,
      },
    }));

    const mockUser = new User(mockUserData);

    Task.api().fetch.mockImplementation(() => ({
      response: {
        data: [],
      },
    }));

    Task.api().create.mockImplementation(() => ({
      response: {
        data: mockTaskData,
      },
    }));

    // const mockTasks = mockTaskData.map((data) => new Task(data));

    // mockUser.tasks = mockTasks;

    const wrapper = mount(TodoListPage, {
      router,
      localVue,
      computed: {
        user() {
          return mockUser;
        },
      },
    });

    await wrapper.setData({
      showManageModal: true,
      task: new Task({
        title: "test",
        description: "descrpition",
      }),
    });

    await flushPromises();

    const form = wrapper.findComponent({ ref: "form" });

    await form.trigger("submit");

    expect(wrapper.vm.$data.showManageModal).toBeFalsy();
  });
});

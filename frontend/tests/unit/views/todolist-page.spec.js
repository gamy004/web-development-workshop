jest.mock("@/models/User");
jest.mock("@/models/TodoList");
import flushPromises from "flush-promises";
import { shallowMount, mount } from "@vue/test-utils";
import { localVue } from "../../bootstrap";
import todolistPage from "@/views/todolist-page.vue";
import { User } from "@/models/User";
import TodoList from "@/models/TodoList";
import TodoModal from "@/components/TodoModal.vue";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("todolist-page.vue", () => {
  it("display button add new task", async () => {
    const userData = {
      id: 2,
      username: "user2",
      email: "user2@test.com",
      confirmed: true,
      role: { id: 1, name: "Authenticated" },
    };

    const todoListData = [
      {
        id: 1,
        title: "test20",
        description: null,
        created_at: "2023-04-05T08:00:00.000Z",
        user: {
          ...userData,
          role: 1,
        },
      },
    ];

    User.api().fetchUser.mockImplementationOnce(() => userData);

    User.query().first.mockImplementationOnce(
      () => new User({ ...userData, roleId: 1 })
    );

    TodoList.api().getUserTask.mockImplementationOnce(() => todoListData);

    TodoList.query()
      .where("userId", userData.id)
      .get.mockImplementationOnce(() =>
        todoListData.map(
          (data) => new TodoList({ ...data, userId: userData.id })
        )
      );

    const wrapper = shallowMount(todolistPage, {
      localVue,
    });

    await flushPromises();

    const button = wrapper.findComponent({ ref: "addNewTaskButton" });
    expect(button.exists()).toBe(true);

    const todoCards = wrapper.findAllComponents({ ref: "todoCard" });

    expect(todoCards.exists()).toBe(true);
    expect(todoCards.length).toBe(1);

    const firstTodoCard = todoCards.at(0);

    expect(firstTodoCard.text()).toContain("test20");
    expect(firstTodoCard.text()).toContain("สร้างเมื่อ: 5/4/2566 15:00:00");

    const editButton = firstTodoCard.find(".button__edit");

    expect(editButton.exists()).toBeTruthy();
    expect(editButton.text()).toContain("Edit");

    const deleteButton = firstTodoCard.find(".button__delete");

    expect(deleteButton.exists()).toBeTruthy();
    expect(deleteButton.text()).toContain("Delete");
  });

  it("Should show modal when click add new task button", async () => {
    const userData = {
      id: 2,
      username: "user2",
      email: "user2@test.com",
      confirmed: true,
      role: { id: 1, name: "Authenticated" },
    };

    const todoListData = [];

    User.api().fetchUser.mockImplementationOnce(() => userData);

    User.query().first.mockImplementationOnce(
      () => new User({ ...userData, roleId: 1 })
    );

    TodoList.api().getUserTask.mockImplementationOnce(() => todoListData);

    TodoList.query()
      .where("userId", userData.id)
      .get.mockImplementationOnce(() => todoListData);

    const wrapper = mount(todolistPage, {
      localVue,
      TodoModal,
    });

    await flushPromises();

    const button = wrapper.findComponent({ ref: "addNewTaskButton" });
    await button.trigger("click");
    expect(wrapper.vm.modalShow).toBe(true);
    expect(TodoModal).toBeVisible();

    // const buttonAdd = TodoModal.find(".button__add");
    // expect(buttonAdd.exists()).toBeTruthy();
  });
});

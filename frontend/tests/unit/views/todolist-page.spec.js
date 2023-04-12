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

    const button = wrapper.findComponent({ ref: "addNewTaskButton" }); // button add for open modal
    await button.trigger("click");
    expect(wrapper.vm.modalShow).toBe(true);
    expect(wrapper.isVisible()).toBe(true);

    const todoModal = wrapper.findComponent(TodoModal);
    expect(todoModal.exists()).toBe(true);
    expect(todoModal.text()).toContain("Add New Task");
    expect(todoModal.text()).toContain("Title");
    expect(todoModal.text()).toContain("Description");

    const addButton = todoModal.find(".button__add"); // button add for add new title and description to vuex and db
    expect(addButton.exists()).toBeTruthy();
    expect(addButton.text()).toContain("Add");
  });
});

it("Should show modal when click add edit task button ", async () => {
  // สั่งให้ jest คอยตรวจ method "onUpdateSuccess"
  const onUpdateSuccessSpy = jest.spyOn(
    todolistPage.methods,
    "onUpdateSuccess"
  );

  // const editTodo = {
  //   id: 1,
  //   title: "test edit task",
  //   description: "test edit description",
  // };

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

  const newTodolistData = {
    id: 1,
    title: "test edit task",
    description: "test edit description",
  };

  User.query().first.mockImplementationOnce(
    () => new User({ ...userData, roleId: 1 })
  );

  TodoList.query()
    .where("userId", userData.id)
    .get.mockImplementationOnce(() =>
      todoListData.map((data) => new TodoList({ ...data, userId: userData.id }))
    );

  // แก้ให้ mock api โดยการ return ค่าที่ส่งมาจาก param แทน fix value จาก inputTitle กับ inputDescription
  TodoList.api().updateUserTask.mockImplementationOnce(
    ({ id, title, description }) => ({
      id,
      title,
      description,
    })
  );

  const wrapper = mount(todolistPage, {
    localVue,
    TodoModal,
  });

  await flushPromises();

  const button = wrapper.findComponent({ ref: "editTaskButton" });
  await button.trigger("click");

  expect(wrapper.vm.modalShow).toBe(true);

  const todoModal = wrapper.findComponent(TodoModal);

  expect(todoModal.isVisible()).toBe(true);
  expect(todoModal.exists()).toBe(true);
  expect(todoModal.text()).toContain("Edit Task");
  expect(todoModal.text()).toContain("Title");
  expect(todoModal.text()).toContain("Description");

  const inputTitle = todoModal.findComponent({ ref: "input__title" });
  // เช็ค value ของ input เท่ากับค่าเริ่มต้น title ไหม
  expect(inputTitle.element.value).toBe("test20");

  // เทสเปลี่ยนค่า value title
  await inputTitle.setValue(newTodolistData.title);

  // เช็ค value ของ input เท่ากับค่าใหม่ title ไหม
  expect(inputTitle.element.value).toBe(newTodolistData.title);

  const inputDescription = todoModal.findComponent({
    ref: "input__description",
  });

  // เช็ค value ของ input เท่ากับค่าเริ่มต้น description ไหม
  expect(inputDescription.element.value).toBe("");

  // เทสเปลี่ยนค่า value description
  await inputDescription.setValue(newTodolistData.description);

  // เช็ค value ของ input เท่ากับค่าเริ่มใหม่ description ไหม
  expect(inputDescription.element.value).toBe(newTodolistData.description);

  const editButton = todoModal.find(".button__edit");
  expect(editButton.exists()).toBeTruthy();
  expect(editButton.text()).toContain("Edit");

  await editButton.trigger("click");

  await flushPromises();

  // TodoList.api().updateUserTask.mockImplementationOnce(() => {
  //   inputTitle.element.value, inputDescription.element.value;
  // });

  expect(TodoList.api().updateUserTask).toBeCalledWith(newTodolistData);

  // เช็คว่า TodoModal ควร emit event "update:success" ด้วย
  expect(todoModal.emitted("update:success")).toBeTruthy();

  // เช็คว่า method "OnUpdateSuccess" ถูกเรียกไหม หลังจากที่ event "update:success" ถูก emit
  expect(onUpdateSuccessSpy).toHaveBeenCalled();
});

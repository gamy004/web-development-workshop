import BaseModel from "./BaseModel";

const fakeFnGetUserTask = jest.fn(() => {
  return [
    {
      id: 1,
      title: "test",
      description: null,
      userId: 1,
    },
  ];
});

const fakeFnUpdateUserTask = jest.fn(() => {
  return [
    {
      id: 1,
      title: "test",
      description: null,
    },
  ];
});

const fakeFnDeleteUserTask = jest.fn(() => {
  return [
    {
      id: 1,
      title: "test",
      description: null,
    },
  ];
});

export class TodoList extends BaseModel {
  get readableCreatedAt() {
    return new Date(this.created_at).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  }

  static api() {
    return {
      getUserTask: fakeFnGetUserTask,
      updateUserTask: fakeFnUpdateUserTask,
      deleteUserTask: fakeFnDeleteUserTask,
    };
  }
}

export default TodoList;

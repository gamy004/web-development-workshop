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

export class TodoList extends BaseModel {
  get readableCreatedAt() {
    return new Date(this.created_at).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    });
  }

  static api() {
    return {
      getUserTask: fakeFnGetUserTask,
    };
  }
}

export default TodoList;

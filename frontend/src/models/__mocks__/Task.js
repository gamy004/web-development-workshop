import BaseModel from "./BaseModel";

const fakeFnFetch = jest.fn(() => {});

export class Task extends BaseModel {
  static entity = "tasks";

  constructor(
    props = { title: "", description: null, user_id: null, user: null }
  ) {
    super(props);
  }

  static api() {
    return {
      fetch: fakeFnFetch,
    };
  }
}

export default Task;

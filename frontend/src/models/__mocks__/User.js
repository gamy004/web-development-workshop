import BaseModel from "./BaseModel";

const fakeFnLoad = jest.fn(() => {});

export class User extends BaseModel {
  static entity = "users";

  constructor(props = {}) {
    super(props);
  }

  static api() {
    return {
      load: fakeFnLoad,
    };
  }
}

export default User;

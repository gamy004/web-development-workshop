import { Model } from "@vuex-orm/core";
// import User from "./User";
class Role extends Model {
  static entity = 'role'

  static fields() {
    return {
      id: this.attr(null),
      name: this.string(''),
      description: this.string(''),
      type: this.string(''),
      // user: this.hasMany(User, 'role')
    }
  }
}
export default Role
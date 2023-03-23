import { Model } from "@vuex-orm/core";
import User from "./User";

export class Role extends Model {
    static entity = "roles";

    static fields() {
        return {
          id: this.attr(null),
          name: this.string(""),
          description: this.string(""),
          type: this.string(""),
          users: this.hasMany(User, 'role_id')
        };
      }
}

export default Role;
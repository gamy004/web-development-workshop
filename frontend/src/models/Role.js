import { Model } from "@vuex-orm/core";
import User from "./User";

export class Role extends Model {
    static entity = "roles";

    static fields() {
        return {
          id: this.attr(null),
          name: this.attr(""),
          description: this.attr(""),
          type: this.attr(""),
          users: this.hasMany(User, 'role_id')
        };
      }
}

export default Role;
import { Model } from '@vuex-orm/core'

export class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      username: this.string(""),
      password:this.string(""),
      email: this.string(""),
      confirmed: this.boolean(false)
    }
  }
}

export default User;

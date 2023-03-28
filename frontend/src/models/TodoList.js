import { Model } from '@vuex-orm/core'

export class TodoList extends Model {
    static entity = 'todolists'
  
    static fields () {
      return {
        id: this.attr(null),
        message: this.string(""),
      }
    }
    
}
export default TodoList

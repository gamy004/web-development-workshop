import { Model } from "@vuex-orm/core";
// import User from "./User";
class Task extends Model {
  static entity = 'task'

  static fields() {
    return {
      id: this.attr(null),
      name: this.string(''),
      description: this.string(''),
      user:this.attr(null)
    }
  }
  static editTask(tid,task){
    console.log(tid)
    let r = this.update({
      where: tid,
      data:task
    })
    console.log(r)
  }
  static deleteTask(tid){
    console.log(tid)
    let r = this.delete(tid)
    console.log(r)
  }
}
export default Task
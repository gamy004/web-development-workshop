import { Model } from '@vuex-orm/core'
import Role from './Role'
import Task from './Task'
class User extends Model {
  static entity = 'users'

  static fields() {
    return {
      id: this.attr(null),
      username: this.string(''),
      password: this.string(''),
      email: this.string(''),
      confirmed: this.boolean(false),
      role: this.hasOne(Role, "id"),
      tasks_id: this.attr([]),
      tasks: this.hasManyBy(Task, "tasks_id")
    }
  }
  static apiConfig = {
    actions: {
      login(user) {
        return this.post('/auth/local', { identifier: user.email, password: user.password }, {
          dataTransformer: (response) => {
            localStorage.setItem("jwt", response.data.jwt)
            return response.data.user
          }
        })
      },
      fetchUserData() {
        return this.get('/users/me')
      }
    }
  }
  static async addTask(task) {
    console.log(task)
    const uid = await User.fetchUserId();
    task.user = uid
    const newTask = Task.insert({ data: task })
    let user = User.find(uid)
    this.update({
      where: uid,
      data: {
        tasks_id: [...user.tasks_id, newTask.id]
      }
    })
    return newTask
  }
  static get globalApiConfig() {
    return localStorage.getItem("jwt") != null ? { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("jwt") } } : null
  }
  static async login(user) {
    this.apiConfig.login(user)
  }
  static async fetchUserId() {
    let response = await this.api().fetchUserData()
    console.log(response.response)
    return response.response.data.id
  }

}
export default User

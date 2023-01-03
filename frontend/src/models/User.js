import { Model } from '@vuex-orm/core'

class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      username: this.string(''),
      password: this.string(''),
      email: this.string(''),
      confirmed: this.boolean(false),
    }
  }
  static apiConfig ={
    actions:{
      login (user){
        return this.post('/auth/local',{identifier:user.email,password:user.password},{
          dataTransformer:(response)=>{
            localStorage.setItem("jwt",response.data.jwt)
            return response.data.user
          }
        })
      }
    }
  }
  static async login(user){
    this.apiConfig.login(user)
  }
}
export default User
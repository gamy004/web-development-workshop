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
  
  static globalApiConfig = {
    headers: localStorage.getItem("jwt")!==null?{ 'Authorization':"Bearer "+ localStorage.getItem("jwt")  }:{}
  }
  static apiConfig = {
    actions: {
      login(body) {
        // console.log("dsdsihfdslsasa");
        return this.post(`/auth/local`,body,{ save: false ,
            dataTransformer:(res)=>{
                localStorage.setItem("jwt", res.data.jwt)
                return res.data.user
            }
        })
      },
        load(){
        return this.get(`/users/me`)
    }
    },

  }

  static fetchById (id) {
    return this.api().get(`/api/users/${id}`)
  }

  static async login(body){
    // console.log("fdshfdsds");
    let res = await this.api().login(body)
    // console.log(res);
    await res.save()
  }


  
}

export default User;

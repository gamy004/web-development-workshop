import { Model } from '@vuex-orm/core'
import Role from "./Role"

export class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      username: this.string(""),
      password:this.string(""),
      email: this.string(""),
      confirmed: this.boolean(false),
      role_id: this.attr(null),
      role: this.belongsTo(Role, 'role_id')
    }
  }
  
//   static globalApiConfig = {
//     headers: localStorage.getItem("jwt")!==null?{ 'Authorization':"Bearer "+ localStorage.getItem("jwt")  }:{}
//   }

  static isLoggedIn() {
    return localStorage.getItem("jwt") !== null;
  }

  static get globalApiConfig() {
    const headers = {};

    const jwtToken = localStorage.getItem("jwt");

    if (jwtToken !== null) {
      headers.Authorization = `Bearer ${jwtToken}`;
    }

    return {
      headers,
    };
  }

  static apiConfig = {
    actions: {
      login(body) {
        return this.post(`/auth/local`,body,{
            dataTransformer:(res)=>{
                localStorage.setItem("jwt", res.data.jwt)
                return res.data.user
            }
        })
      },
        async fetchUser(){
          return this.get(`/users/me`)
    }
    },

  }

//  static async fetchById () {
//     return this.api().get(`/api/users/${id}`)
//   }

  static async login(body){
    let res = await this.api().login(body)
    console.log(res);
    await res.save()
  }



}

export default User;

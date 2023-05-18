import { Model } from "@vuex-orm/core"

export class User extends Model {
    static entity = 'users';
    static fields = () => {
        return {
            id: this.attr(null),
            username: this.string(null),
            password: this.string(null),
            email: this.string(null),
            comfirmed: this.boolean(false),
        }
    }

    static signIn = (identifier, password) => {
        return this.api().post(`/auth/local`, { identifier, password })
            .then(res => {
                let accessToken = res.response.data.jwt;
                if (accessToken) localStorage.setItem('userAccessToken', accessToken);

                let userInfo = res.response.data.user;
                if (userInfo) localStorage.setItem('userInfo', JSON.stringify(userInfo));

                return {
                    accessToken,
                    userInfo
                };
            });
    }

    static getAccessToken = () => localStorage.getItem('userAccessToken');
    static getUserInfo = () => {
        let userInfoJsonStr = localStorage.getItem('userInfo');
        if (userInfoJsonStr) return JSON.parse(userInfoJsonStr);
    }
}

export default User;
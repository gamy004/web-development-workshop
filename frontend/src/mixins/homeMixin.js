import User from "@/models/User";

export const homeMixin = {
  methods: {
    async $_homeMixin_onSubmit() {
      let body = { identifier: this.email, password: this.password };

      await User.login(body);
    },
    async $_homeMixin_onLogout() {
      await User.isLoggedOut();
    },
  },
};

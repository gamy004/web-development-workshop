<template>
  <div>
    <b-row id="homePage">
      <b-col cols="12" class="mt-3">
        <h2 class="d-flex align-items-baseline">
          <font-awesome-icon icon="home" />
          <span class="ml-2">Home</span>
        </h2>
      </b-col>
      <b-button :to="{ name: 'about' }">About</b-button>
    </b-row>
    <b-form @submit="onSubmit">
      <b-form-input class="mb-2" type="email" placeholder="Enter email" v-model="user.email"></b-form-input>
      <b-form-input class="mb-2" type="password" placeholder="Enter password" v-model="user.password"></b-form-input>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { User } from "../models";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },

  computed: {
    isLoggnedIn() {
      return User.isLoggedIn;
    },
  },

  methods: {
    async onSubmit(event) {
      event.preventDefault()
      await User.api().logIn(this.user.email, this.user.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.button__toggle-password {
  cursor: pointer;
}
</style>

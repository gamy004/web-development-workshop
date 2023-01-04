<template>
  <b-row id="homePage">
    <b-col cols="12" class="mt-3">
      <h2 class="d-flex align-items-baseline">
        <font-awesome-icon icon="home" />
        <span class="ml-2">Home</span>
      </h2>
    </b-col>
  </b-row>
</template>

<script>
import { User } from "../models";

export default {
  data() {
    return {
    };
  },

  computed: {
    isLoggnedIn() {
      return User.isLoggedIn;
    },
  },

  methods: {
    async onSubmit() {
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

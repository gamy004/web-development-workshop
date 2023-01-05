<template>
  <b-row id="homePage">
    <b-col cols="12" class="mt-3">
      <h2 class="d-flex align-items-baseline">
        <font-awesome-icon icon="home" />
        <span class="ml-2">Home</span>
      </h2>

      <b-button :to="{ name: 'about' }">
        <font-awesome-icon icon="info" />
        About
      </b-button>

      <b-button :to="{ name: 'todoList' }">
        <font-awesome-icon icon="list" />
        Todo
      </b-button>
    </b-col>

    <b-col cols="12" class="mt-3">
      <b-card title="Log In">
        <b-form v-if="!isLoggnedIn" @submit.prevent="onSubmit">
          <b-form-group id="input-group-email" label="Email" label-for="email">
            <b-form-input
              type="email"
              id="email"
              name="email"
              v-model="user.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-password"
            label="password"
            label-for="password"
          >
            <b-input-group class="mt-3">
              <template #append>
                <b-input-group-text
                  class="button__toggle-password"
                  @click="showPassword = !showPassword"
                >
                  <font-awesome-icon
                    :icon="showPassword ? 'eye' : 'eye-slash'"
                  />
                </b-input-group-text>
              </template>

              <b-form-input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                v-model="user.password"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-button type="submit" variant="primary">Log In</b-button>
        </b-form>

        <b-card-text v-else>You are already logged in!</b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { User } from "../models";

export default {
  data() {
    return {
      user: new User(),
      showPassword: false,
    };
  },

  computed: {
    isLoggnedIn() {
      return User.isLoggedIn;
    },
  },

  methods: {
    async onSubmit() {
      try {
        await User.api().logIn(this.user.email, this.user.password);

        this.$router.replace({ name: "about" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button__toggle-password {
  cursor: pointer;
}
</style>

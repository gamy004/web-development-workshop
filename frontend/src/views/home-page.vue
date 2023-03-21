<template>
  <div>
    <b-row id="homePage">
      <b-col cols="12" class="mt-3">
        <h2 class="d-flex align-items-baseline">
          <font-awesome-icon icon="home" />
          <span class="ml-2">Home</span>
        </h2>
      </b-col>
      <b-button title="About" :to="{ name: 'about' }"><font-awesome-icon :icon="['fas', 'info']" />
        About</b-button>
    </b-row>
    <!-- form input -->
    <b-form @submit="onSubmit" class="my-2">
      <b-form-group label="Email">
        <b-form-input v-model="email" type="email"></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input v-model="password" type="password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import User from '@/models/User';
export default {
  data() {
    return {
      email: "nampun@mail.com",
      password: "123456"
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      // let { email, password } = this 

      let body = { identifier: this.email, password: this.password }
      // let user = new User({ email, password })

      await User.login(body)
    },

  }
};
</script>

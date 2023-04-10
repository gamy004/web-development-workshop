<template>
  <div>
    <b-card id="homePage" class="my-3">
      <h2 class="d-flex align-items-baseline">
        <font-awesome-icon icon="house" />
        <span ref="h2__title" class="ml-2" title="Home">Home</span>
      </h2>
      <b-button title="About" :to="{ name: 'about' }"><font-awesome-icon icon="info" class="mr-1" />
        About
      </b-button>
    </b-card>

    <!-- form input -->
    <b-form @submit.prevent="onSubmit" class="my-2" v-if="statusLogin">
      <b-form-group label="Email">
        <b-form-input v-model="email" type="email"></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input v-model="password" type="password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-button v-else @click="onlogOut()" variant="danger">LogOut</b-button>
  </div>
</template>

<script>
// import User from '@/models/User';
import { homeMixin } from '@/mixins/homeMixin';
export default {
  mixins: [homeMixin],
  data() {
    return {
      email: "nampun@mail.com",
      password: "123456",
      statusLogin: false
    };
  },
  methods: {
    onSubmit() {
      this.$_homeMixin_onSubmit()
      this.statusLogin = false
    },
    onlogOut() {
      this.$_homeMixin_onLogout()
      this.statusLogin = true
    },
    async mounted() {

    },
  },

};
</script>

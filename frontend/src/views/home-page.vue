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

    <b-alert variant="danger" show v-if="loginError">Email or Password is invalid.</b-alert>

    <div>
      <b-form @submit.prevent="onSubmit" class="my-2" v-if="statusLogin">
        <b-form-group label="email">
          <b-form-input id="email" v-model="email" type="text" :state="emailInputState"></b-form-input>

          <b-form-invalid-feedback id="email-feedback">
            <span v-if="!$v.email.required">Email is required</span>
            <span v-else-if="!$v.email.email">Please fill an incorrect email pattern</span>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="password">
          <b-form-input id="password" v-model="password" type="password" :state="passwordInputState"></b-form-input>
          <b-form-invalid-feedback id="password-feedback">
            <span v-if="!$v.password.required">password is required</span>
            <span v-if="!$v.password.minLength">Your password must be at least 6 characters</span>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>

      <b-button v-else @click="onlogOut()" variant="danger">LogOut</b-button>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { homeMixin } from '@/mixins/homeMixin';
export default {
  mixins: [homeMixin],
  data() {
    return {
      email: "nampun@mail.com",
      password: "123456",
      statusLogin: false,
      loginError: false,
      isInvalid: null
    };
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },

  computed: {

    emailInputState() {
      return this.isInvalid ? !this.$v.email.$invalid : null;
    },
    passwordInputState() {
      return this.isInvalid ? !this.$v.password.$invalid : null;
    }

  },

  methods: {

    async onSubmit() {
      this.isInvalid = null;

      this.$v.$touch();

      if (this.$v.$invalid) {
        this.isInvalid = true;

        return;
      }

      this.loginError = false;

      try {
        await this.$_homeMixin_onSubmit();

        this.statusLogin = false;
      } catch (error) {
        this.loginError = true;
      }

    },
    onlogOut() {
      this.$_homeMixin_onLogout()
      this.statusLogin = true
    },
    mounted() { },
  },

};
</script>

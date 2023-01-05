<template>
  <div>
    <b-row id="homePage">
      <b-col cols="12" class="mt-3">
        <h2 class="d-flex align-items-baseline">
          <font-awesome-icon icon="home" />
          <b-link :to="{ path: '/about'}" title="about button"><font-awesome-icon icon="fa-solid fa-info" /></b-link>
          <span class="ml-2">Home</span>
        </h2>
      </b-col>
      
    </b-row>
    <b-row>
      <b-col >
        <b-form @submit="onSubmit">

        
        <b-form-group :state="state" :invalid-feedback="invalidFeedback">
          <b-form-input type="email" v-model="email" name="email"></b-form-input>
          <b-form-input type="password" v-model="password" name="password"></b-form-input>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form-group>
      </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import User from '@/models/User';


export default {
  data() {
    return {
      email:"email1@name.com",
      password:"123456"
    };
  },
  methods:{
    onSubmit(event){

      event.preventDefault()
      const userData = new User({email:this.email,password:this.password})
      User.api().login(userData)
    }
  },
  computed:{
    state(){
      return this.email.length >0
    },
    invalidFeedback() {
        if (this.email.length > 0) {
          return 'Enter at least 1 characters.'
        }
        return 'Please enter something.'
      }
  }
};
</script>

<style lang="scss" scoped>
.button__toggle-password {
  cursor: pointer;
}
</style>

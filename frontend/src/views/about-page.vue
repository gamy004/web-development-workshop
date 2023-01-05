<template>
  <div>
    <b-link :to="{ path: '/todo-list' }" title="todoList"><font-awesome-icon icon="fa-solid fa-list" /></b-link>
    <b-link :to="{ path: '/home' }" title="home button"><font-awesome-icon icon="fa-solid fa-home" /></b-link>
    <b-card
      :title="userData.username"
      v-if="userData!=null"
    >
      <b-card-text>
        email :{{ userData.email }}
      </b-card-text>
      <b-card-text>
        role :{{ userData.role.name }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import User from '@/models/User';

export default {
  data() {
    return {
      userId: null
    };
  },
  async mounted() {
    let userId = await User.fetchUserId()
    this.userId = userId
    // const user = User.query().withAll('role')
   
    // this.userData = user
  },
  computed:{
    userData (){
      return User.query().with('role').where('id',this.userId).first()
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
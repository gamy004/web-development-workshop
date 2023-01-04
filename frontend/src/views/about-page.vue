<template>
  <b-row id="homePage">
    <b-col cols="12" class="mt-3">
      <h2 class="d-flex align-items-baseline">
        <font-awesome-icon icon="info" />
        <span class="ml-2">About</span>
      </h2>

      <b-button :to="{ name: 'home' }">
        <font-awesome-icon icon="home" />
        Home
      </b-button>
    </b-col>

    <b-col cols="6" class="mt-3">
      <b-card v-if="user" title="User Information">
        <b-card-text>
          <div><b>Email: </b>{{ user.email }}</div>
          <div><b>Username: </b>{{ user.username }}</div>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { User } from "../models";

export default {
  data() {
    return {
      userId: null,
    };
  },

  computed: {
    user() {
      return User.find(this.userId);
    },
  },

  async mounted() {
    const promise = await User.api().load();

    const { id } = promise.response.data;

    if (id) {
      this.userId = id;
    }
  },
};
</script>

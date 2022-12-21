<template>
  <b-row id="homePage">
    <b-col cols="12" class="mt-3">
      <h2>
        <font-awesome-icon icon="home" />
        Home Page
      </h2>

      <b-button @click="getUsername">Get username</b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    getUsername() {
      console.log("get username: ", this.username);
    },
  },
};
</script>

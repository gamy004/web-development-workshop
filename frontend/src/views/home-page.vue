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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

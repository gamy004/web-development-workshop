<template>
  <b-card title="Current Location" class="card__title-location">
    <b-card-text class="text__title">{{ location }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      location: window.location
    };
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
.card__title-location {
  .card-title {
    font-weight: bold;
  }
}
</style>

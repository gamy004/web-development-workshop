<template>
  <b-card title="Current Location" class="card__title-location">
    <b-card-text class="text__title">{{ location }}</b-card-text>
  </b-card>
</template>
s

<script>
export default {
  computed: {
    location() {
      return `${window.location.origin}${this.$route.fullPath}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card__title-location {
  .card-title {
    font-weight: bold;
  }
}
</style>

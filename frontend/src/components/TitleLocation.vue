<template>
  <b-card title="Current Location" class="card__title-location">
    <b-card-text class="text__title">{{ current_location }}</b-card-text>
  </b-card>
</template>
s

<script>
export default {
  data() {
    return {
      location: window.origin + this.$route.path,
    };
  },
  computed:{
    current_location(){
      return window.origin + this.$route.path
    }
  }
};
</script>

<style lang="scss" >
.card__title-location {
  .card-title {
    font-weight: bold;
  }
}
</style>

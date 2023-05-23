<template>
	<b-card ref="locationCard" title="Current Location" class="card__title-location">
		<b-card-text class="text__title">{{ currentLocation }}</b-card-text>
	</b-card>
</template>

<script>
export default {
	computed: {
		currentLocation() {
			return `${window.location.origin}${this.$route.path}`;
		},
	},
};
</script>

<style lang="scss" scoped>
.card__title-location {
	.text__title {
		font-weight: bold;
	}
}
</style>

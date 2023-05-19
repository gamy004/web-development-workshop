<template>
	<div id="app">
		<nav-bar />

		<b-container fluid>
			<b-row id="homePage" align-h="center" align-v="center">
				<b-col>
					<b-card ref="card__welcome" title="Welcome to Learn4Life Workshop!!">
						<b-card-text>
							The purpose of this repository is to provide training material and step by step instructions. The workshop will be split in 2 categories (Backend &
							Frontend) over the course of 2-3 days. At the end of the workshop we would have successfully built a web project based on our stack using Strapi and
							Vue.js.
						</b-card-text>
						<b-card-text>
							For more information, please checkout workshop's
							<a href="https://bitbucket.org/kmutt-ets/learn4life-workshop/src/main" target="__blank">repository</a>
							to get guidelines and more details.
						</b-card-text>
					</b-card>
				</b-col>
			</b-row>

			<b-row class="mt-3">
				<b-col>
					<title-location />
				</b-col>
			</b-row>

			<router-view></router-view>
		</b-container>
	</div>
</template>

<script>
import TitleLocation from "./components/TitleLocation";
import NavBar from "./components/NavBar";
import { mapActions } from "vuex";

export default {
	name: "App",

	components: {
		TitleLocation,
		NavBar,
	},
	async created() {
		await this.init();
	},
	methods: {
		...mapActions({
			init: "authentication/init",
		}),
	},
};
</script>

<style lang="scss">
@import "./assets/ui-fort/bamburgh.scss";
</style>

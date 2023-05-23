<template>
	<b-navbar toggleable="lg" type="dark" variant="primary">
		<b-navbar-brand :to="{ name: 'home' }">Learn4Life Workshop</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="nav-items-container">
				<b-nav-item
					:ref="`${navigations.home.name}-navItem`"
					:to="{ name: navigations.home.name }"
					:active="$route.name == navigations.home.name"
				>
					{{ navigations.home.text }}
				</b-nav-item>
				<b-nav-item
					v-if="isAuthenticated"
					:ref="`${navigations.about.name}-navItem`"
					:to="{ name: navigations.about.name }"
					:active="$route.name == navigations.about.name"
				>
					{{ navigations.about.text }}
				</b-nav-item>
				<b-nav-item
					v-if="isAuthenticated"
					:ref="`${navigations.todoList.name}-navItem`"
					:to="{ name: navigations.todoList.name }"
					:active="$route.name == navigations.todoList.name"
				>
					{{ navigations.todoList.text }}
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav class="nav-items-container ml-auto">
				<b-button
					ref="signInBtn"
					v-if="!isAuthenticated"
					variant="secondary"
					size="md"
					@click="onSignInClicked"
				>
					Sign In
				</b-button>
				<b-button ref="signOutBtn" v-if="isAuthenticated" variant="danger" size="md" @click="onSignOutClicked">
					Sign Out
				</b-button>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import { routerMixin } from "../mixins/routerMixin";
import { mapGetters, mapActions } from "vuex";

export default {
	mixins: [routerMixin],
	data() {
		return {
			navigations: {
				home: {
					name: "home",
					text: "Home",
				},
				about: {
					name: "about",
					text: "About",
				},
				todoList: {
					name: "todo-list",
					text: "Todo List",
				},
			},
		};
	},
	computed: {
		...mapGetters({
			isAuthenticated: "authentication/isAuthenticated",
		}),
	},
	methods: {
		...mapActions({
			signOut: "authentication/signOut",
		}),
		onSignInClicked() {
			if (this.$route.name !== "home") {
				this.$router.push("home");
			}
		},
		onSignOutClicked() {
			this.signOut();
			if (this.$route.name !== "home") {
				this.$router.push("home");
			}
		},
	},
};
</script>

<style lang="css" scoped>
.nav-items-container {
	display: flex;
	gap: 0.5rem;
	padding: 0.25rem 0;
}
</style>

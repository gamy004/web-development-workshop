<template>
	<div id="home-page" class="card mt-3">
		<div class="card-body">
			<div class="header">
				<font-awesome-icon icon="fa-solid fa-info" class="icon" />
				<span class="page-name">{{ pageName }}</span>
			</div>
			<ul class="nav">
				<li class="nav-item">
					<b-link class="nav-link" :to="{ name: navigations.home.name }">{{ navigations.home.text }}</b-link>
				</li>
				<li class="nav-item">
					<b-link class="nav-link" :to="{ name: navigations.about.name }">{{ navigations.about.text }}</b-link>
				</li>
			</ul>
			<div ref="userInfo" v-if="isAuthenticated">
				<b-card :title="title" :sub-title="subTitle">
					<b-card-body>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<span><b>ID: </b>{{ currentUser.id }}</span>
							</li>
							<li class="list-group-item">
								<span><b>Username: </b>{{ currentUser.username }}</span>
							</li>
							<li class="list-group-item">
								<span><b>Email: </b>{{ currentUser.email }}</span>
							</li>
							<li class="list-group-item">
								<span><b>Provider: </b>{{ currentUser.provider }}</span>
							</li>
							<li class="list-group-item">
								<span><b>Role: </b>{{ currentUser.role.name }}</span>
							</li>
						</ul>
					</b-card-body>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			pageName: "About",
			navigations: {
				home: {
					name: "home",
					text: "Home",
				},
				about: {
					name: "about",
					text: "About",
				},
			},
			title: "About me",
			subTitle: "My account information",
		};
	},
	computed: {
		...mapGetters({
			isAuthenticated: "authentication/isAuthenticated",
			currentUser: "authentication/currentUser",
		}),
	},
};
</script>

<style lang="css" scoped>
.header {
	display: flex;
	flex-direction: row;
	align-items: baseline;
	gap: 0.5rem;
	padding: 0.5rem 0.25rem;
}

.header > .icon {
	font-size: 2rem;
}
.header > .page-name {
	font-size: 2rem;
}
.nav-link {
	font-size: 1.25rem;
}
</style>

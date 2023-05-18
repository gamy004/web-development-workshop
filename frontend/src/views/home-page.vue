<template>
	<div id="home-page" class="card mt-3">
		<div class="card-body">
			<div class="header">
				<font-awesome-icon icon="fa-solid fa-house" class="icon" />
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

			<div class="row">
				<b-form class="col-4" v-if="true" @submit="onSignIn">
					<b-form-group id="email" label="Email address" label-for="email">
						<b-form-input id="email" v-model="user.email" type="email" placeholder="Your email" required></b-form-input>
					</b-form-group>

					<b-form-group id="password" label="Password" label-for="password">
						<b-form-input id="password" v-model="user.password" type="password" required></b-form-input>
					</b-form-group>

					<div class="d-flex flex-row justify-content-end">
						<button class="btn btn-primary">Sign In</button>
					</div>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import User from '@/models/user';

export default {
	data() {
		return {
			pageName: "Home",
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
			user: new User()
		};
	},
	methods: {
		async onSignIn(event) {
			event.preventDefault();
			const res = await User.signIn(this.user.email, this.user.password);
			console.log(res);
		}
	}
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

.header>.icon {
	font-size: 2rem;
}

.header>.page-name {
	font-size: 2rem;
}

.nav-link {
	font-size: 1.25rem;
}
</style>

<template>
	<div id="home-page" class="card mt-3">
		<div class="card-body">
			<div class="header">
				<font-awesome-icon icon="fa-solid fa-house" class="icon" />
				<span class="page-name">{{ pageName }}</span>
			</div>

			<div class="row">
				<b-form class="col-md-4 mx-auto sign-in-form" ref="signInForm" v-if="!isAuthenticated" @submit.prevent="onSignIn">
					<b-form-group id="email" label="Email" label-for="email">
						<b-form-input id="email" v-model="authenticationForm.email" type="text" placeholder="Your email"></b-form-input>
					</b-form-group>

					<b-form-group id="password" label="Password" label-for="password">
						<b-form-input id="password" v-model="authenticationForm.password" type="password"></b-form-input>
					</b-form-group>

					<div class="error-container" ref="errorContainer" v-if="errorMessages.length > 0">
						<b-form-invalid-feedback :state="!(errorMessages.length > 0)" v-for="(errorMessage, index) in errorMessages" :key="'errror-' + index">
							{{ errorMessage }}
						</b-form-invalid-feedback>
					</div>

					<div class="d-flex flex-row justify-content-end">
						<button type="submit" class="btn btn-primary">Sign In</button>
					</div>
				</b-form>
				<b-form class="col-4 sign-out-form" ref="signOutForm" v-else @submit.prevent="onSignOut">
					<button type="submit" class="btn btn-danger">Sign Out</button>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			pageName: "Home",
			authenticationForm: {
				email: null,
				password: null,
			},
			errorMessages: [],
		};
	},
	validations() {
		return {
			authenticationForm: {
				email: { required, email },
				password: { required },
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
			signIn: "authentication/signIn",
			signOut: "authentication/signOut",
		}),
		async onSignIn() {
			this.$v.authenticationForm.$reset();
			this.errorMessages = [];

			this.$v.authenticationForm.$touch();
			if (!this.$v.authenticationForm.email.required) {
				this.errorMessages.push(`Email is required.`);
			}
			if (!this.$v.authenticationForm.email.email) {
				this.errorMessages.push(`Email format invalid.`);
			}
			if (!this.$v.authenticationForm.password.required) {
				this.errorMessages.push(`Password is required.`);
			}

			if (this.$v.authenticationForm.$invalid) return;

			await this.signIn({
				email: this.authenticationForm.email,
				password: this.authenticationForm.password,
			})
				.then(() => {
					this.authenticationForm.email = null;
					this.authenticationForm.password = null;
					this.$router.push("about");
				})
				.catch((e) => {
					this.errorMessages = this.errorMessages.concat(e.message);
				});
		},
		onSignOut() {
			this.signOut();
			this.authenticationForm.email = null;
			this.authenticationForm.password = null;
			this.$v.authenticationForm.$reset();
			this.errorMessages = [];
		},
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
</style>

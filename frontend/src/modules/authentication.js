import axios from "axios";
import User from "./../models/user";

const state = {
	user: null,
	accessToken: null,
	axios: axios.create({
		baseURL: process.env.VUE_APP_BASE_URL,
		withCredentials: true,
	}),
};
const getters = {
	isAuthenticated: (state) => !!state.user && !!state.accessToken,
	currentUser: (state) => state.user,
	accessToken: (state) => state.accessToken,
};
const actions = {
	init: async ({ dispatch, commit }) => {
		let cacheAccessToken = localStorage.getItem("accessToken");
		if (cacheAccessToken) {
			commit("setAccessToken", cacheAccessToken);
			return await dispatch("loadUserInfo").catch(() => {
				commit("clear");
			});
		}
		return Promise.resolve();
	},
	loadUserInfo: async ({ commit, state }) => {
		if (!state.accessToken) throw new Error(`accessToken not found.`);

		const headers = {
			Authorization: `Bearer ${state.accessToken}`,
		};

		return await state.axios
			.get(`/users/me`, {
				headers,
			})
			.then((response) => {
				if (response.data) commit("setUser", new User(response.data));
			})
			.catch(() => {
				commit("clear");
			});
	},
	signIn: async ({ commit, state }, authentication) => {
		return await state.axios
			.post(`/auth/local`, {
				identifier: authentication.email,
				password: authentication.password,
			})
			.then((response) => {
				if (response.data?.user) commit("setUser", new User(response.data.user));
				if (response.data?.jwt) commit("setAccessToken", response.data.jwt);
			})
			.catch(() => {
				throw new Error("Authentication failed.");
			});
	},
	signOut: ({ commit }) => {
		commit("clear");
	},
};
const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setAccessToken(state, accessToken) {
		state.accessToken = accessToken;
		localStorage.setItem("accessToken", accessToken);
	},
	clear(state) {
		state.user = null;
		state.accessToken = null;
		localStorage.removeItem("accessToken");
	},
};
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};

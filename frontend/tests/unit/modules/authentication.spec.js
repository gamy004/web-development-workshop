import AuthUser from "@/models/AuthUser";
import AuthenticationModule from "@/modules/authentication";

describe("Authentication Module: State", () => {
	const { state } = AuthenticationModule;

	beforeEach(() => {
		jest.clearAllMocks();
		state.user = null;
		state.accessToken = null;
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should be defined", () => {
		expect(state.user).toBeNull();
		expect(state.accessToken).toBeNull();
		expect(state.axios).toBeDefined();
	});
});

describe("Authentication Module: Getters", () => {
	const { state, getters } = AuthenticationModule;

	beforeEach(() => {
		jest.clearAllMocks();
		state.user = null;
		state.accessToken = null;
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should return valid value", () => {
		expect(getters.isAuthenticated(state)).toBeFalsy();
		expect(getters.currentUser(state)).toBeNull();
		expect(getters.accessToken(state)).toBeNull();

		const mockUser = new AuthUser({ email: "test@mail.com" });
		const mockAccessToken = "accessToken";
		state.user = mockUser;
		state.accessToken = mockAccessToken;

		expect(getters.isAuthenticated(state)).toBeTruthy();
		expect(getters.currentUser(state)).toBe(mockUser);
		expect(getters.accessToken(state)).toBe(mockAccessToken);
	});
});

describe("Authentication Module: Actions", () => {
	const { state, actions } = AuthenticationModule;
	const commit = jest.fn();
	const dispatch = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		state.user = null;
		state.accessToken = null;
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	describe("init", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			state.user = null;
			state.accessToken = null;
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		it("should return resolve when no token in localStorage.", async () => {
			let getItem = jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

			await expect(actions.init({ dispatch, commit })).resolves.toBeUndefined();
			expect(getItem).toHaveReturnedWith(null);
			expect(commit).not.toHaveBeenCalledWith("setAccessToken", null);
			expect(dispatch).not.toHaveBeenCalledWith("loadUserInfo");
		});

		it("should return resolve when token exist in localStorage.", async () => {
			let getItem = jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
			dispatch.mockResolvedValue();

			await expect(actions.init({ dispatch, commit })).resolves.toBeUndefined();
			expect(getItem).toHaveReturnedWith("token");
			expect(commit).toHaveBeenCalledWith("setAccessToken", "token");
			expect(dispatch).toHaveBeenCalledWith("loadUserInfo");
		});

		it("should return resolve when dispatch 'loadUserInfo' throw error.", async () => {
			let getItem = jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
			dispatch.mockRejectedValue(new Error(`accessToken not found.`));

			await expect(actions.init({ dispatch, commit })).resolves.toBeUndefined();
			expect(getItem).toHaveReturnedWith("token");
			expect(commit).toHaveBeenCalledWith("setAccessToken", "token");
			expect(dispatch).toHaveBeenCalledWith("loadUserInfo");
			expect(commit).toHaveBeenCalledWith("clear");
		});
	});

	describe("loadUserInfo", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			state.user = null;
			state.accessToken = null;
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		it("should work properly when userInfo request resolved with data.", async () => {
			let mockUserInfo = {
				data: {
					email: "test@mail.com",
				},
			};
			let userInfoRequest = jest.spyOn(state.axios, "get").mockResolvedValueOnce(mockUserInfo);
			state.accessToken = "accessToken";

			await expect(actions.loadUserInfo({ commit, state })).resolves.toBeUndefined();
			expect(userInfoRequest).toHaveBeenCalled();
			expect(commit).toHaveBeenCalledWith("setUser", new AuthUser(mockUserInfo.data));
		});

		it("should work properly when userInfo request resolved with no data.", async () => {
			let mockUserInfo = {
				data: null,
			};
			let userInfoRequest = jest.spyOn(state.axios, "get").mockResolvedValueOnce(mockUserInfo);
			state.accessToken = "accessToken";

			await expect(actions.loadUserInfo({ commit, state })).resolves.toBeUndefined();
			expect(userInfoRequest).toHaveBeenCalled();
			expect(commit).not.toHaveBeenCalledWith("setUser", new AuthUser(mockUserInfo.data));
		});

		it("should work properly when userInfo request rejected.", async () => {
			let userInfoRequest = jest.spyOn(state.axios, "get").mockRejectedValue();
			state.accessToken = "accessToken";

			await expect(actions.loadUserInfo({ commit, state })).resolves.toBeUndefined();
			expect(userInfoRequest).toHaveBeenCalled();
			expect(commit).toHaveBeenCalledWith("clear");
		});

		it("should reject with throw error when accessToken empty.", async () => {
			state.accessToken = null;
			let expectedError = new Error(`accessToken not found.`);

			await expect(actions.loadUserInfo({ commit, state })).rejects.toThrow(expectedError);
		});
	});

	describe("signIn", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			state.user = null;
			state.accessToken = null;
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		it("should sign in successfully with data.", async () => {
			let mockResponse = {
				data: {
					user: {
						email: "test@mail.com",
					},
					jwt: "token",
				},
			};
			let signInRequest = jest.spyOn(state.axios, "post").mockResolvedValueOnce(mockResponse);
			await expect(
				actions.signIn({ commit, state }, { email: "email", password: "password" })
			).resolves.toBeUndefined();
			expect(signInRequest).toHaveBeenCalled();
			expect(commit).toHaveBeenCalledWith("setUser", new AuthUser(mockResponse.data.user));
			expect(commit).toHaveBeenCalledWith("setAccessToken", mockResponse.data.jwt);
		});

		it("should sign in successfully with no data.", async () => {
			let mockResponse = {
				data: null,
			};
			let signInRequest = jest.spyOn(state.axios, "post").mockResolvedValueOnce(mockResponse);
			await expect(
				actions.signIn({ commit, state }, { email: "email", password: "password" })
			).resolves.toBeUndefined();
			expect(signInRequest).toHaveBeenCalled();
			expect(commit).not.toHaveBeenCalledWith("setUser", new AuthUser(mockResponse.data?.user));
			expect(commit).not.toHaveBeenCalledWith("setAccessToken", mockResponse.data?.jwt);
		});

		it("should throw error when rejected from sign in request.", async () => {
			let signInRequest = jest.spyOn(state.axios, "post").mockRejectedValue();
			let expectedException = new Error("Authentication failed.");

			await expect(actions.signIn({ commit, state }, { email: "email", password: "password" })).rejects.toThrow(
				expectedException
			);
			expect(signInRequest).toHaveBeenCalled();
		});
	});

	describe("signOut", () => {
		beforeEach(() => {
			jest.clearAllMocks();
			state.user = null;
			state.accessToken = null;
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		it("should sign out successfully.", () => {
			actions.signOut({ commit });
			expect(commit).toHaveBeenCalledWith("clear");
		});
	});
});

describe("Authentication Module: Mutations", () => {
	const { state, mutations } = AuthenticationModule;

	beforeEach(() => {
		jest.clearAllMocks();
		state.user = null;
		state.accessToken = null;
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should set user state", () => {
		const mockUser = new AuthUser({ email: "test@mail.com" });

		mutations.setUser(state, mockUser);
		expect(state.user).toBe(mockUser);
	});

	it("should set accessToken state", () => {
		let setItem = jest.spyOn(Storage.prototype, "setItem");

		const mockAccessToken = "token";

		mutations.setAccessToken(state, mockAccessToken);
		expect(state.accessToken).toBe(mockAccessToken);
		expect(setItem).toHaveBeenCalledWith("accessToken", mockAccessToken);
	});

	it("should clear state", () => {
		let removeItem = jest.spyOn(Storage.prototype, "removeItem");

		state.user = new AuthUser({ email: "test@mail.com" });
		state.accessToken = "token";

		mutations.clear(state);
		expect(state.user).toBeNull();
		expect(state.accessToken).toBeNull();
		expect(removeItem).toHaveBeenCalledWith("accessToken");
	});
});

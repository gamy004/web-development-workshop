import TodoList from "@/models/TodoList";
import store from "@/store";

describe("TodoList Vuex ORM", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it("should return authorization header", () => {
		const mockToken = "token";
		store.commit("authentication/setAccessToken", mockToken);

		const expectHeaders = { headers: { Authorization: "Bearer token" } };

		expect(TodoList.globalApiConfig).toStrictEqual(expectHeaders);
	});

	it("should return empty header", () => {
		const mockToken = null;
		store.commit("authentication/setAccessToken", mockToken);

		const expectHeaders = { headers: {} };

		expect(TodoList.globalApiConfig).toStrictEqual(expectHeaders);
	});
});

module.exports = {
	preset: "@vue/cli-plugin-unit-jest",
	transformIgnorePatterns: ["/node_modules/(?!bootstrap-vue)/"],
	collectCoverage: true,
	collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
};

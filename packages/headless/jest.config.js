module.exports = {
	roots: ["<rootDir>/src"],

	// Adds Jest support for TypeScript using ts-jest.
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},

	// Run code before each file in the suite is tested.
	setupFilesAfterEnv: ['./jest.setup.ts'],

	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

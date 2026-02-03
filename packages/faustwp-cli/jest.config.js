export default {
	roots: ['<rootDir>/tests'],

	// Adds Jest support for TypeScript using ts-jest.
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
	},
	testEnvironment: 'jsdom',
	// Run code before each file in the suite is tested.
	setupFilesAfterEnv: ['./jest.setup.ts'],

	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

	// ESM Support
	// @link https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	collectCoverage: false,
	coverageProvider: 'v8',
	coverageReporters: ['json', 'html'],
	passWithNoTests: true,
};

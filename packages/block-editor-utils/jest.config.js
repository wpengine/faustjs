module.exports = {
  roots: ['<rootDir>/tests'],

  // Adds Jest support for TypeScript using ts-jest.
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
  // Run code before each file in the suite is tested.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: [
		'<rootDir>/tests/global-mocks.ts',
	],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // ESM Support
  // @link https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    "uuid": require.resolve('uuid'),
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
    '^react-dom($|/.+)': '<rootDir>/node_modules/react-dom$1'
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  passWithNoTests: true,
};

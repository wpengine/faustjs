module.exports = {
  roots: ['<rootDir>/tests'],

  // Adds Jest support for TypeScript using ts-jest.
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Run code before each file in the suite is tested.
  setupFilesAfterEnv: ['./jest.setup.ts'],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // ESM Support
  // @link https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  passWithNoTests: true,
};

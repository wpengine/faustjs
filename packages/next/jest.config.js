module.exports = {
  roots: ['<rootDir>/test'],

  // Adds Jest support for TypeScript using ts-jest.
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Run code before each file in the suite is tested.
  setupFilesAfterEnv: ['./jest.setup.ts'],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Fix default switch that came in jest v27.0.0
  // Link: https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults
  timers: 'legacy',

  // ESM Support
  // @link https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

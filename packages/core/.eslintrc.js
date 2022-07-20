module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaFeatures: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
    },
  },
  plugins: ['import', 'simple-import-sort'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-void': 0,
    'import/named': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
    'import/extensions': ['error', 'always'],
  },
  settings: {},
  ignorePatterns: [
    'test/**/*',
    '.prettierrc.js',
    'jest.config.js',
    'jest.setup.ts',
    'utils.d.ts',
    'utils.js',
    '.eslintrc.js',
  ],
};

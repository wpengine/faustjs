module.exports = {
    root: true,
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
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: './tsconfig.json',
      ecmaFeatures: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        jsx: true,
      },
    },
    plugins: ['import', 'simple-import-sort', 'react', 'react-hooks'],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      '@typescript-eslint/unbound-method': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'no-void': 0,
      'import/named': 0,
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'jest.setup.ts',
            '**/__tests__/*',
            '**/*.test.ts',
            '**/*.test.tsx',
          ],
        },
      ],
      'import/prefer-default-export': 0,
      'react/jsx-closing-bracket-location': 0,
      'react/jsx-props-no-spreading': ['error', { html: 'ignore' }],
      'react/jsx-wrap-multilines': [
        'error',
        { declaration: false, assignment: false },
      ],
      'react/prop-types': 0,
      'react/require-default-props': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
      'no-underscore-dangle': ['error', { 'allow': ['__schema'] }],
      'import/extensions': ['error', 'always'],
    },
    settings: {
        react: {
          createClass: 'createReactClass', // Regex for Component Factory to use,
          // default to "createReactClass"
          pragma: 'React', // Pragma to use, default to "React"
          version: '17.0', // React version. "detect" automatically picks the version you have installed.
          // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
          // default to latest and warns if missing
          // It will default to "detect" in the future
        },
      },
    ignorePatterns: [
      '**/test/*',
      '**/tests/*',
      '.prettierrc.js',
      'jest.config.js',
      'jest.setup.ts',
      'utils.d.ts',
      'utils.js',
      '.eslintrc.js',
      '**/dist/*',
      '**/*.d.ts',
      'examples/**/*'
    ],
  };

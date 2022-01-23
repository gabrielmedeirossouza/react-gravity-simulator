module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "max-len": ["warn", { code: 120 }],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-shadow": "off",
    "react/jsx-props-no-spreading": "off",
    "no-nested-ternary": "off",
    "no-unused-vars": "off",
    camelcase: "off",
    "@typescript-eslint/no-shadow": "off",
    "prettier/prettier": [
      "off",
      {
        singleQuote: false,
        trailingComma: "es5",
        printWidth: 120,
        tabWidth: 2,
        semi: true,
      },
    ],
    "no-param-reassign": ["error", { props: false }],
    "implicit-arrow-linebreak": ["error", "beside"],
  },
  globals: {
    NodeJS: true,
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-alert": 0,
    "no-plusplus": 0,
    "react/jsx-no-bind": 0,
  },
};

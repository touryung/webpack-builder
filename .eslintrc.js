module.exports = {
  parser: "@babel/eslint-parser",
  extends: "airbnb-base",
  env: {
    browser: true,
    node: true,
  },
  rules: {
    quotes: ["error", "double"],
  },
};

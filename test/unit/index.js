const path = require("path");

process.chdir(path.join(__dirname, "../template"));

describe("webpack-builder test case", () => {
  require("./webpack-base.test");
});

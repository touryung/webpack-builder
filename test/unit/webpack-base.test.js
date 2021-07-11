const assert = require("assert");
const baseConfig = require("../../lib/webpack.base");

describe("webpack.base.js test case", () => {
  it("entry", () => {
    assert.strictEqual(baseConfig.entry.index.indexOf("webpack-builder/test/template/src/index/index.js") > -1, true);
    assert.strictEqual(baseConfig.entry.search.indexOf("webpack-builder/test/template/src/search/index.js") > -1, true);
  });
});

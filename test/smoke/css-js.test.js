const glob = require("glob-all");

describe("check generate css js file", () => {
  it("should generate css js file", (done) => {
    const files = glob.sync(["./dist/index_*.js", "./dist/index_*.css", "./dist/search_*.js", "./dist/search_*.css"]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no css js file generated");
    }
  });
});

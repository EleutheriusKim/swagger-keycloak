const oldSpec = require('./data/diff.oldSpec.json')
const newSpec = require('./data/diff.newSpec.json')
const {diff, diffOperation} = require("../../src/utils/swagger-diff");
const SwaggerParser = require("@apidevtools/swagger-parser");


describe("Service Test", () => {
  it("getOne() Test", async () => {

    const result = await diff(oldSpec, newSpec);
    console.log(`result: ${JSON.stringify(result)}`)

    result.modifiedSpec
      .map((v) => diffOperation(v.oldSpec, v.newSpec))
      .forEach(v => console.log(`result: ${JSON.stringify(v)}`))
    result.createSpec
      .map((v) => diffOperation(v.oldSpec, v.newSpec))
      .forEach(v => console.log(`result: ${JSON.stringify(v)}`))
    result.deletedSpec
      .map((v) => diffOperation(v.oldSpec, v.newSpec))
      .forEach(v => console.log(`result: ${JSON.stringify(v)}`))
  });
});
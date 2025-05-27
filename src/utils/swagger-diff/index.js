// const {fetchSchemaSwagger} = require("./prepareSwagger");
const {createSignatureMap} = require("./createSignature");
const SwaggerParser = require("@apidevtools/swagger-parser");
const parser = new SwaggerParser();

const prepareSpec = async (spec) => {
  return await parser.validate(spec) // reference mapping
    .then(openapiSpec => createSignatureMap(openapiSpec.paths))
}

const diff = async (oldSpec, newSpec) => {
  const [o, n] = [await prepareSpec(oldSpec), await prepareSpec((newSpec))]

  const oList = Object.keys(o)
  const nList = Object.keys(n)

  const createSpec = nList.filter(name => oList.indexOf(name) === -1).map(name => n[name])
  const deletedSpec = oList.filter(name => nList.indexOf(name) === -1).map(name => o[name])
  const modifiedSpec = nList
    .filter(name => oList.indexOf(name) !== -1)
    .filter(name => o[name].hash !== n[name].hash)
    .map(name => {
      return {
        name,
        oldSpec: o[name].spec,
        newSpec: n[name].spec
      }
    })

  return {createSpec, modifiedSpec, deletedSpec}
}

const operationObjectDiffMap =
  ({
     operationId,
     tags, summary,
     description, parameters,
     requestBody, responses, deprecated,
   }) => {
    return {
      operationId,
      tags, summary,
      description, parameters,
      requestBody, responses, deprecated,
    }
  }
const diffOperation = (oldSpec, newSpec) => {
  const [o, n] = [operationObjectDiffMap(oldSpec), operationObjectDiffMap(newSpec)]

  console.log(`o: ${JSON.stringify(o)}`)
  console.log(`n: ${JSON.stringify(n)}`)

  const checkList = ['tags', 'summary', 'description', 'parameters', 'requestBody', 'responses', 'deprecated']

  return checkList
    .filter(check => JSON.stringify(o[check]) !== JSON.stringify(n[check]))
    .map(check => {
      return {
        name: check,
        old: o[check],
        new: n[check]
      }
    })
}


module.exports = {
  diff,
  diffOperation
}
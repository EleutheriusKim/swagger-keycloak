const {generateHash} = require("../stringUtils");

const createSignatureMap = (paths) => {
  return typeof paths !== 'object' || paths === undefined
    ? {}
    : Object.keys(paths)
      .flatMap(path =>
        Object.keys(paths[path])
          .map(method => {
            return {
              name: `${path}::${method}`,
              hash: generateHash(JSON.stringify(paths[path][method])),
              spec: paths[path][method]
            }
          })
      ).reduce((obj, {name, hash, spec}) => {
        obj[name] = {name, hash, spec: spec}
        return obj
      }, {})
}

module.exports = {
  createSignatureMap
}
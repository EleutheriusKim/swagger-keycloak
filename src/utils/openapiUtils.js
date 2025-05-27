const YAML = require('yamljs');

const yaml2Json = (yaml) => {
  return YAML.parse(yaml);
}

const filterShowYn = (inputObj) => {
  const filteredPaths = Object.keys(inputObj.paths).reduce((acc, path) => {
    const methods = inputObj.paths[path];

    const filteredMethods = Object.keys(methods).reduce((filtered, method) => {
      const operation = methods[method];

      if (!(operation["x-show-yn"] ?? true)) {
        return filtered;
      }

      filtered[method] = operation;
      return filtered;
    }, {});

    if (Object.keys(filteredMethods).length > 0) {
      acc[path] = filteredMethods;
    }

    return acc;
  }, {});

  return {...inputObj, paths: filteredPaths};
}

const filterRules = (inputObj, userRules = []) => {
  const filteredPaths = Object.keys(inputObj.paths).reduce((acc, path) => {
    const methods = inputObj.paths[path];

    const filteredMethods = Object.keys(methods).reduce((filtered, method) => {
      const operation = methods[method];

      const operationRules = operation["x-rules"] ?? []

      if (operationRules !== [] && operationRules.any(v => userRules.includes(v))) {
        return filtered;
      }

      filtered[method] = operation;
      return filtered;
    }, {});

    if (Object.keys(filteredMethods).length > 0) {
      acc[path] = filteredMethods;
    }

    return acc;
  }, {});

  return {...inputObj, paths: filteredPaths};
}

module.exports = {
  filterShowYn,
  filterRules,
  yaml2Json
}
const crypto = require('crypto');

const generateHash = (data) => {
  return crypto.createHash('md5').update(data).digest("hex");
}

module.exports = {
  generateHash
}
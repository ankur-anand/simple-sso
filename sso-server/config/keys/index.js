const fs = require("fs");
const path = require("path");

const privateKeyFilePath =
  process.env.JWT_SSO_PRIVATE_KEY_FILE ||
  path.resolve(__dirname, "./jwtPrivate.key");

const privateCert = fs.readFileSync(privateKeyFilePath);

const jwtValidatityKey = "simple-sso-jwt-validatity";

module.exports = Object.assign(
  {},
  {
    privateCert,

    jwtValidatityKey
  }
);

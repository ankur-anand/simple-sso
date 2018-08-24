const jwt = require("jsonwebtoken");
const { privateCert } = require("../config").keys;

const ISSUER = "simple-sso";

const genJwtToken = payload =>
  new Promise((resolve, reject) => {
    // some of the libraries and libraries written in other language,
    // expect base64 encoded secrets, so sign using the base64 to make
    // jwt useable across all platform and langauage.
    jwt.sign(
      { ...payload },
      privateCert,
      {
        algorithm: "RS256",
        expiresIn: "1h",
        issuer: ISSUER
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });

module.exports = Object.assign({}, { genJwtToken });

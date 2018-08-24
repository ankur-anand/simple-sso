const jwt = require("jsonwebtoken");
const { publicKey } = require("./config").keys;

const ISSUER = "simple-sso";
const verifyJwtToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      { issuer: ISSUER, algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });
module.exports = Object.assign({}, { verifyJwtToken });

const url = require("url");
const axios = require("axios");
const { URL } = url;
const { verifyJwtToken } = require("./jwt_verify");
const validReferOrigin = "http://localhost:3010";
const ssoServerJWTURL = "http://localhost:3010/simplesso/verifytoken";

const ssoRedirect = () => {
  return async function(req, res, next) {
    // check if the req has the queryParameter as ssoToken
    // and who is the referer.
    const { ssoToken } = req.query;
    if (ssoToken != null) {
      // If the refer URL is not present in the header some one is smart
      // or application is not following the best pattern
      if (req.headers.referer == null) return next();
      // Validate the refer too for better security for your own application
      const referURL = new URL(req.headers.referer);

      // validate the referer origin
      if (referURL.origin !== validReferOrigin) {
        return res.status(400).json({ message: "BAD SSO SERVER" });
      }
      // to remove the ssoToken in query parameter redirect.
      const redirectURL = url.parse(req.url).pathname;
      try {
        const response = await axios.get(
          `${ssoServerJWTURL}?ssoToken=${ssoToken}`,
          {
            headers: {
              Authorization: "Bearer l1Q7zkOL59cRqWBkQ12ZiGVW2DBL"
            }
          }
        );
        const { token } = response.data;
        const decoded = await verifyJwtToken(token);
        req.session.user = decoded;
      } catch (err) {
        return next(err);
      }

      return res.redirect(`${redirectURL}`);
    }
    return next();
  };
};

module.exports = ssoRedirect;

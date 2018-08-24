const URL = require("url").URL;

const validReferOrigin = "http://localhost:3010";

const ssoRedirect = () => {
  return function(req, res, next) {
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
      req.session.user = ssoToken;
      return next();
    }
    return next();
  };
};

module.exports = ssoRedirect;

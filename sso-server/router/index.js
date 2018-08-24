const express = require("express");
const URL = require("url").URL;

const router = express.Router();
const controller = require("../controller");

const alloweOrigin = {
  "http://localhost:3020": true,
  "http://localhost:3080": false
};

router
  .route("/login")
  .get((req, res) => {
    // The req.query will have the redirect url where we need to redirect after successful
    // login and with sso token.
    // This can also be used to verify the origin from where the request has came in
    // for the redirection
    const { serviceURL } = req.query;
    const url = new URL(serviceURL);
    if (alloweOrigin[url.origin] !== true) {
      return res
        .status(400)
        .json({ message: "Your are not allowed to access the sso-server" });
    }

    return res.render("login", { title: "SSO-Server | Login" });
  })
  .post(controller.doLogin);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller");

router
  .route("/login")
  .get((req, res) => {
    return res.render("login", { title: "SSO-Server | Login" });
  })
  .post(controller.doLogin);

module.exports = router;

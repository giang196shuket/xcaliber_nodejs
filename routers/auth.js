var express = require("express");
var router = express.Router();
const auth = require("../app/controllers/auth");

router.get("/login", auth.login);

router.get("/logout", auth.logout);

router.get("/verify", auth.verify);

module.exports = router;

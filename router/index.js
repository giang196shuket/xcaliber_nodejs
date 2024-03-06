var express = require("express");
var router = express.Router();
const homeController = require("../app/controller/Home");

router.get("/", homeController.index);

module.exports = router;

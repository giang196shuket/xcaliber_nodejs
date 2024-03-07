var express = require("express");
var router = express.Router();
const homeController = require("../app/controller/Home");

router.post("/home/getHospitalList", homeController.api_getHospitalList);

module.exports = router;

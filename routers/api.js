var express = require("express");
var router = express.Router();
const mainController = require("../app/controllers/main");
const authController = require("../app/controllers/auth.js");

router.post("/auth/verify", authController.verifyLogin);


router.post("/main/getHospitalList", mainController.api_getHospitalList);
router.post("/main/getNoticeList", mainController.api_getNoticeList);
router.post("/main/getFaqAndCateList", mainController.api_getFaqAndCateList);
router.post("/main/getFaqByCategory", mainController.api_getFaqByCategory);
router.post("/main/getHospitalListSearch", mainController.api_getHospitalListSearch);
router.post("/main/searchHospital", mainController.api_searchHospital);
router.post("/main/getArea1", mainController.api_getArea1);
router.post("/main/getArea2", mainController.api_getArea2);
router.post("/main/getAddress", mainController.api_getAddress);

module.exports = router;

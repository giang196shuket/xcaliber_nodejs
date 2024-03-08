var express = require("express");
var router = express.Router();
const auth = require("../app/controllers/auth.js");

router.get('/', auth.verify, auth.redirectLogin, function(req, res){
    res.render("admin/dashboard", {
        layout: "layouts/admin/default",
        pageTitle: "Xcaliber manager",
        active: "dashboard",
        user: req.user,
    });
})

module.exports = router;

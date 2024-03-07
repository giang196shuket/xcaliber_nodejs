var express = require("express");
var router = express.Router();



router.get('/', function(req, res){
    res.render("partials/home", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/intro', function(req, res){
    res.render("partials/intro", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/search-clinic', function(req, res){
    res.render("partials/clinic", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/notice', function(req, res){
    res.render("partials/notice", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/faq', function(req, res){
    res.render("partials/faq", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


module.exports = router;

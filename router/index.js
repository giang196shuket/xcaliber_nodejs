var express = require("express");
var router = express.Router();



router.get('/', function(req, res){
    res.render("partials/home", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/introduce', function(req, res){
    res.render("partials/introduce", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/clinic', function(req, res){
    res.render("partials/clinic", {
        layout: "layouts/mobile/default",
        title:"XCALIBER"
    });
})


router.get('/news', function(req, res){
    res.render("partials/news", {
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

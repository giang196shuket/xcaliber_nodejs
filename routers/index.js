var express = require("express");
var router = express.Router();



router.get('/', function(req, res){
    res.render("index", {
        layout: "layouts/mobile/default",
    });
})


router.get('/intro', function(req, res){
    res.render("partials/intro", {
        layout: "layouts/mobile/default",
    });
})


router.get('/search-clinic', function(req, res){
    res.render("partials/clinic", {
        layout: "layouts/mobile/default",
    });
})


router.get('/notice', function(req, res){
    res.render("partials/notice", {
        layout: "layouts/mobile/default",
    });
})


router.get('/faq', function(req, res){
    res.render("partials/faq", {
        layout: "layouts/mobile/default",
    });
})


module.exports = router;

const homeModel = require("../models/Home");


module.exports = {
    async index(req, res, next) {
        res.render("partials/home", {
            layout: "layouts/client/default",
            title:"XCALIBER"
        });
    },
    //API 
    async api_getHospitalList(req, res, next) {   
        const data = await homeModel.getHospitalList();
        console.log('data')
        res.json({
            result: true,
            data: data
        });
    },  
};

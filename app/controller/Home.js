const homeModel = require("../models/Home");


module.exports = {
 
    //API 
    async api_getHospitalList(req, res, next) {   
        const data = await homeModel.getHospitalList();

        res.json({
            result: true,
            data: data
        });
    },  
};

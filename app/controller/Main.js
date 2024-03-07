const mainModel = require("../models/Main");


module.exports = {
 
    //API 
    async api_getAddress(req, res, next) {   
        const area1 = req.body.area1
        const area2 = req.body.area2

        const data = await mainModel.getAddress(area1.trim(), area2.trim());

        res.json({
            result: true,
            data: data
        });
    }, 
    async api_getArea2(req, res, next) {   
        const area1 = req.body.area1
        console.log(area1);
        const data = await mainModel.getArea2(area1.trim());

        res.json({
            result: true,
            data: data
        });
    }, 
    async api_getArea1(req, res, next) {   

        const data = await mainModel.getArea1();

        res.json({
            result: true,
            data: data
        });
    }, 
    async api_searchHospital(req, res, next) {   
        const keyword = req.body.keyword
        const data = await mainModel.searchHospital(keyword.trim());

        res.json({
            result: true,
            data: data
        });
    },  
    async api_getHospitalList(req, res, next) {   
        const data = await mainModel.getHospitalList();

        res.json({
            result: true,
            data: data
        });
    },  
    async api_getHospitalListSearch(req, res, next) {   
        let keyword = req.body.keyword;

        const data = await mainModel.getHospitalListSearch(keyword.trim());

        res.json({
            result: true,
            data: data
        });
    }, 
    async api_getFaqByCategory(req, res, next) {   
        let page = req.body.page;
        let rowCount = req.body.rowCount;
        let category = req.body.category;

        const data = await mainModel.getFaqByCategory(page, rowCount, category);
        res.json({
            result: true,
            data: data
        });
    },  
    async api_getNoticeList(req, res, next) {   
        let page = req.body.page;
        let rowCount = req.body.rowCount;
        const data = await mainModel.getNoticeList(page, rowCount);
        res.json({
            result: true,
            data: data
        });
    },  
    async api_getFaqAndCateList(req, res, next) {   
        let page = req.body.page;
        let rowCount = req.body.rowCount;

        const data = await mainModel.getFaqAndCateList(page, rowCount);
        res.json({
            result: true,
            data: data
        });
    },  
    async api_getFaqByCategory(req, res, next) {   
        let page = req.body.page;
        let rowCount = req.body.rowCount;
        let category = req.body.category;

        const data = await mainModel.getFaqByCategory(page, rowCount, category);
        res.json({
            result: true,
            data: data
        });
    },  
};

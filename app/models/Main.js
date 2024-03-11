
const pool = require("../../config/database");
const logger = require("../../config/logger");

module.exports = class mainModel {  
    static async getAddress(area1, area2) {
        let logBase = `mainModel/getAddress`;
        try {
            let sql = ` SELECT id, hospital_name, address, naver_link, lat, lng FROM hospitals where area1 = '${area1}' and area2 = '${area2}' ; `
            const [rows] = await pool.mysqlPool.query(sql);
            return rows
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return [];
        }
    }
    static async getArea2(area1) {
        let logBase = `mainModel/getArea2`;

        try {
            let sql = ` SELECT A.area2, A.id  FROM hospitals   A where A.area1 = '${area1}' group by A.area2  `
            const [rows] = await pool.mysqlPool.query(sql);
            return rows
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return [];
        }
    }
    static async getArea1() {
        let logBase = `mainModel/getArea1`;

        try {
            let sql = ` SELECT A.area1, A.id FROM hospitals  A group by A.area1 `
            const [rows] = await pool.mysqlPool.query(sql);
            return rows
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return [];
        }
    }
    static async searchHospital(keyword) {
        let logBase = `mainModel/searchHospital`;

        try {
            let sql = ` SELECT id, area1, area2, hospital_name, address, naver_link, lat, lng FROM hospitals where address  like '${keyword}'`
            const [rows] = await pool.mysqlPool.query(sql);
            return rows[0]
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return false;
        }
    }
    static async getHospitalList() {
        let logBase = `mainModel/getHospitalList`;

        try {
            let sql = ` SELECT id, hospital_name, address, naver_link, lat, lng FROM hospitals`
            const [rows] = await pool.mysqlPool.query(sql);
            return rows
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return [];
        }
    }
    static async getHospitalListSearch(keyword) {
        let logBase = `mainModel/getHospitalListSearch`;

        try {
            let sql = ` SELECT id, hospital_name, address, naver_link, lat, lng FROM hospitals where address like '%${keyword}%' limit 10`
            const [rows] = await pool.mysqlPool.query(sql);
            return rows
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return [];
        }
    }
    static async getNoticeList( page, rowCount) {
        let logBase = `mainModel/getNoticeList: page:${page},  rowCount:${rowCount}`;

        try {
            let sql = " SELECT id, board_category_id, title, external_url, created_at, updated_at FROM staging_board_content "
            let countSql = " SELECT COUNT(id) AS TOTAL_COUNT FROM staging_board_content "          
            if (parseInt(page) > 0) {
                sql += ` LIMIT ${rowCount} OFFSET ${(page - 1) * rowCount} `;
              }

            const [rows] = await pool.mysqlPool.query(sql);
            const [rowsCount] = await pool.mysqlPool.query(countSql);


            return {rows : rows, count: rowsCount[0].TOTAL_COUNT, }
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return false;
        }
    }
    static async getFaqAndCateList( page, rowCount) {
        let logBase = `mainModel/getFaqAndCateList: page:${page},  rowCount:${rowCount}`;

        try {
            let sql = ` SELECT A.id, A.q, A.a, A.faq_category, B.name as cateName 
            FROM faq A
            join faq_category B 
            on a.faq_category = b.id `
            let countSql = " SELECT COUNT(id) AS TOTAL_COUNT FROM faq "  
            let sqlCate = " SELECT id, name FROM faq_category "
        
            if (parseInt(page) > 0) {
                sql += ` LIMIT ${rowCount} OFFSET ${(page - 1) * rowCount} `;
            }

            const [rows] = await pool.mysqlPool.query(sql);
            const [rowsCount] = await pool.mysqlPool.query(countSql);
            const [rowsCate] = await pool.mysqlPool.query(sqlCate);

            return {rows : rows, count: rowsCount[0].TOTAL_COUNT, categories: rowsCate }
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return false;
        }
    }
    static async getFaqByCategory( page, rowCount, category) {
        let logBase = `mainModel/getFaqByCategory: page:${page},  rowCount:${rowCount}, category:${category}`;

        try {
            let where = ""
            if(category === 0){
                //all categories
                where = ''
            }else{
                where = ` where A.faq_category = '${category}' `
            }

            let sql = ` SELECT A.id, A.q, A.a, A.faq_category, B.name as cateName 
            FROM faq A
            join faq_category B 
            on a.faq_category = b.id `

            let countSql = ` SELECT COUNT(A.id) AS TOTAL_COUNT 
            FROM faq A
            join faq_category B 
            on a.faq_category = b.id `   

            sql += where
            countSql += where

            if (parseInt(page) > 0) {
                sql += ` LIMIT ${rowCount} OFFSET ${(page - 1) * rowCount} `;
              }

            const [rows] = await pool.mysqlPool.query(sql);
            const [rowsCount] = await pool.mysqlPool.query(countSql);
            return {rows : rows, count: rowsCount[0].TOTAL_COUNT }
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return false;
        }
    }
}

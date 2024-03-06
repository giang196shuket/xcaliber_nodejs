
const pool = require("../../config/database");
const logger = require("../../config/logger");

module.exports = class homeModel {  
    static async getHospitalList() {
        let logBase = `homeModel/getHospitalList`;

        try {
            const [rows] = await pool.mysqlPool.query(`SELECT id, hospital_name, address, naver_link, lat, lng FROM hospitals`);
            logger.writeLog("info", `${logBase} \n: ${rows}`);

            return rows
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);

            return 0;
        }
    }
}

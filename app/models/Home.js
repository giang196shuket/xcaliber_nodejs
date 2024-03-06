
const pool = require("../../config/database");

module.exports = class homeModel {  
    static async getHospitalList() {

        try {
            const [rows] = await pool.mysqlPool.query(`SELECT id, hospital_name, address, naver_link, lat, lng FROM hospitals`);
            return rows
        } catch (error) {
            return 0;
        }
    }
}

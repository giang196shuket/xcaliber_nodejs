
const pool = require("../../config/database");

module.exports = class homeModel {  
    static async getHospitalList() {

        try {
            const [rows] = await pool.mysqlPool.query(`SELECT id, hospital_name, address, naver_link, lat, lng FROM hospitals`);
            console.log('rows', rows)

            return rows
        } catch (error) {
            console.log('error', error)

            return 0;
        }
    }
}

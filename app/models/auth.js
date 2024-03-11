const logger = require("../../config/logger");
const pool = require("../../config/database");
const moment = require("moment");

module.exports = class authModel {
    static async getByLoginId(loginId) {
        let logBase = `models/authModel.getByLoginId: loginId(${loginId})`;
        try {
            let query = `
            SELECT
                id, userid, name, password
            FROM
                 users
            WHERE
                userid = '${loginId}'`;
             logger.writeLog("info", `${logBase}: $query}`);
            const [rows, fields] = await pool.mysqlPool.query(query);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);
            return null;
        }
    }
        // save when login successful
        static async saveToken(id, token) {
            let logBase = `models/authModel.saveToken`;
            try {
                const time = moment().format('YYYY-MM-DD HH:mm:ss')
                const query = ` UPDATE users SET remember_token = '${token}', join_date = '${time}' where id = '${id}'`;
                await pool.mysqlPool.query(query);
                return true;
            } catch (error) {
                logger.writeLog("error", `${logBase} \nStacktrace: ${error.stack}`);
    
                return false;
            }
        }
};

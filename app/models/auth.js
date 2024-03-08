const logger = require("../../config/logger");
const pool = require("../../config/database");

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
};

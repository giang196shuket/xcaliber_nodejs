const logger = require("../../config/logger.js");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const secretKey = require("../../config/secretKey.js").secretKey;

module.exports = class authService {

    // 로그인 인증
    static async verify(token) {
        if (token) {
            let verifyData = jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    logger.writeLog("error", `service/authService: ${err}`);
                    return null;
                } else {
                    logger.writeLog("info", `service/authService: 토큰체크 완료`);
                    // console.log("decoded.result", decoded.result);
                    return decoded.result;
                }
            });
            return verifyData;
        } else {
            logger.writeLog("error", `service/authService: 토큰 없음`);
            return null;
        }
    }
};

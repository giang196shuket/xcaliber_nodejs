const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const logger = require("../../config/logger.js");
const authService = require("../services/auth.js");
const authModel = require("../models/auth.js");

module.exports = {
    async verify(req, res, next) {
        const token = req.cookies.xToken;
        const authData = await authService.verify(token);

        if (authData && authData[0] == "xcaliber") {
            req.user = {
                app: authData[0],
                seq: authData[1],
                loginId: authData[2],
                name: authData[3],
            };
        } else {
            req.user = null;
        }

        next();
    },

    async verifyLogin(req, res, next) {
        let loginId = req.body.loginId;
        let password = req.body.password;
        let refer = req.body.refer ? req.body.refer : "";

        let userInfo = await authModel.getByLoginId(loginId);
        if (userInfo ) {
            const result = compareSync(password, userInfo.password);
            if (result) {
                const secretKey = require("../../config/secretKey").secretKey;
                const options = require("../../config/secretKey").options;
                let accessToken = sign({ result: ["xcaliber", userInfo.id, userInfo.userid, userInfo.name, ""] }, secretKey, options);
                logger.writeLog("info", `controller/login: 아이디 암호 매칭 성공 ${loginId} / ${accessToken}`);

                    return res.json({
                        result: true,
                        data: {
                            seq: userInfo.seq,
                            loginId: userInfo.userid,
                            name: userInfo.name,
                            adminType: "",
                            token: accessToken,
                            refer: refer,
                        },
                    });

            } else {
                logger.writeLog("info", `controller/login: 로그인 실패 (암호 매칭 실패) ${loginId} / ${password}`);
                return res.json({
                    result: false,
                    data: {
                        code: 2,
                        message: "Not match password",
                    },
                });
            }
        } else {
            logger.writeLog("info", `controller/login: 로그인 실패 (아이디 찾을 수 없음) ${loginId}`);
            return res.json({
                result: false,
                data: {
                    code: 3,
                    mesage: "No user Id exist",
                },
            });
        }
    },

    async redirectLogin(req, res, next) {
        if (!req.user) {
            let loginUrl = "/auth/login?refer=" + (req.route.path != "login" ? req.originalUrl : "");
            res.redirect(loginUrl);
        } else next();
    },

    async login(req, res, next) {
        // 0: normal 1 : bug
        let resultCode = req.query.result ? req.query.result : "0";
        let refer = req.query.refer ? req.query.refer : "";

        res.render("login", {
            layout: "layouts/admin/full",
            apiServer: apiServer,
            resultCode: resultCode,
            refer: refer,
        });
    },

    async logout(req, res, next) {
        res.cookie("xToken", { expires: 0 });

        res.redirect("/");
    },

};

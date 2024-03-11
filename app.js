// Imports
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var compression = require('compression')
const createError = require("http-errors");

const app = express()
global.apiServer = process.env.API_SERVER_ADDRESS;

app.use(compression())

app.use(
    express.json({
        limit: "1000mb",
    })
);
app.use(
    express.urlencoded({
        limit: "1000mb",
        extended: false,
    })
);



// Static Files
var corsOptions = {
    origin: "*",
    credentials: true,
};
//test git
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set Templating Engine
app.use(expressLayouts)
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

// Routes
const indexRouter = require("./routers/index");
const apiRouter = require("./routers/api");
const adminRouter = require("./routers/admin");
const authRouter = require("./routers/auth");

app.use('/', indexRouter)
app.use("/api", apiRouter);
app.use("/xcaliber/admin", adminRouter);
app.use("/x-cal-admin-site", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = process.env.APPLICATION_STATUS === "development" ? err.message : "";
    res.locals.error = process.env.APPLICATION_STATUS === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error", {
        layout: "layouts/admin/full",
        err: err.message,
    });
});


module.exports = app;

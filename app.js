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

const app = express()
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
global.apiServer = process.env.API_SERVER_ADDRESS;

const indexRouter = require("./router/index");
const apiRouter = require("./router/api");

app.use('/', indexRouter)
app.use("/api", apiRouter);

module.exports = app;

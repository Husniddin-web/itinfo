const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const PORT = config.get("port")
const dotenv = require("dotenv")
const winston = require("winston")
const expressWinstion = require("express-winston")

// dotenv.config({
//     path: `.env.${process.env.NODE_ENV}`
// })
// console.log(process.env.NODE_ENV)
// console.log(process.env.secret);

// console.log(config.get("secret"))

// process.on("uncaughtException", (expection) => {
//     console.log("uncaughtException", expection)
// })


// process.on("unhandledRejection", (rejection) => {

//     console.log("unhandledRejection", rejection);

// })



const app = express()

app.use(express.json())

app.use(cookieParser())


const indexRoute = require("./routes/index.routes");
const error_handling_middleware = require('./error_midlleware/error_handling_middleware');

app.use(expressWinstion.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine( 
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use("/api", indexRoute)




app.use(error_handling_middleware) // bu error handling eng ohirida chaqiriladi hamma routelardan song

async function start() {
    try {
        await mongoose.connect(config.get("dbUri")) // prodvider 

        app.listen(PORT, () => {
            console.log("Server is runngin :", PORT);
        })

    } catch (error) {
        console.log("Error coneccting to database", error);
    }
}

start()





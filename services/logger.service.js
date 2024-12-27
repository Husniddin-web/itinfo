const config = require("config");
const winston = require("winston")
require("winston-mongodb")
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, jsonm, prettyPrint, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});


const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat,
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "./log/error.log", level: "error" }),
        new transports.File({ filename: "./log/info.log", level: "info" }),
        new transports.MongoDB({
            db: config.get("dbUri")
        })
    ]
})
logger.exitOnError = false

logger.exceptions.handle(
    new transports.File({ filename: './log/exceptions.log' })
);

logger.rejections.handle(
    new transports.File({ filename: './log/rejections.log' })
);



module.exports = logger
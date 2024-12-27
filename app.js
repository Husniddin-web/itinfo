const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const PORT = config.get("port")
const exHbs = require("express-handlebars")
const viewRouterr = require("./routes/view.routes")

const hbs = exHbs.create({
    defaultLayout: "main",
    extname: "hbs", // handle bars qisqartirmasi
})

const app = express()



app.use(express.json())

app.use(cookieParser())


app.engine("hbs", hbs.engine)

app.set("view engine", "hbs")

app.set("views", "views")

app.use(express.static("views"))

const indexRoute = require("./routes/index.routes");

const error_handling_middleware = require('./error_midlleware/error_handling_middleware');

app.use("/", viewRouterr) /// FRONTEDN 

app.use("/api", indexRoute) /// BACKEND




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





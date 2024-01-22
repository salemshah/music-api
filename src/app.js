/**
 * # Description
 * Gère le démarrage de l'application, le routage et d'autres fonctions de l'application
 * et nécessite d'autres modules pour ajouter des fonctionnalités.
 *
 */

//------------------------------------- imports ---------------------------------------------
const express = require("express");
const fs = require('fs')
const dotenv = require("dotenv");
const config = require("config");
const connect= require("./db/mongo.connection");
const logger = require("./helper/logger");
const catchError = require('./helper/catchError')
const {restResponseTimeHistogram, startMetricsServer} = require("./helper/metrics.js");
const swaggerDocs = require("./helper/swagger.js");
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config();
// ------------------------------------ constants -------------------------------------------
const port = config.get("server.port");
const origin = config.get("client.origin");
const app = express();

// ------------------------------------ middlewares -----------------------------------------
app.use(express.json());
app.use(cookieParser())
app.set('trust proxy', true)

app.use(cors({
    origin: origin, // Frontend URL
    credentials: true,
}));


// ------------------------------------ dynamic routes ---------------------------------------
// require dynamic routes
const dirPath = __dirname + "/routes";
fs.readdirSync(dirPath).map((file) => {
    try {
        if (fs.existsSync(`${dirPath}/${file}`)) app.use("/music/v1", require(`${dirPath}/${file}`));
    } catch (err) {
        logger.error(err);
    }
});

app.use((err, req, res, next) => {
    catchError(err, req, res, next);
});

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    await connect();
    startMetricsServer();
    swaggerDocs(app, port);
});

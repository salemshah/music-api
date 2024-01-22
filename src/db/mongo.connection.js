const mongoose = require("mongoose");
const config = require("config");
const logger = require("../helper/logger");

async function connect() {
    const dbUri = config.get("server.dbUri") || "";
    try {
        await mongoose.connect(dbUri);
        logger.info("DB connected");
    } catch (error) {
        logger.error("Could not connect to db");
        process.exit(1);
    }
}

module.exports = connect;

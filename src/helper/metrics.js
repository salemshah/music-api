/**
 *  # Description
 *  prom-client nous aide à collecter et à stocker des métriques de vos applications,
 *  infrastructures et services, vous permettant d'obtenir des informations sur la santé et les performances de votre système.
 *  prom-client vous permet d'exposer des métriques personnalisées de vos applications Node.js,
 *  qui peuvent ensuite être collectées et analysées par Prometheus.
 *
 */

const express = require("express");
const client = require("prom-client");
const log = require("./logger.js");
const app = express();

exports.restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
});

exports.databaseResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
});

exports.startMetricsServer = function() {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();
    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", client.register.contentType);

        return res.send(await client.register.metrics());
    });

    app.listen(9100, () => {
        log.info("Metrics server started at http://localhost:9100");
    });
}

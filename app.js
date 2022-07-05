const express = require("express");

const indexRouter = require("./routes/index");
const docsRouter = require("./routes/docs");
const stockRouter = require("./routes/stocks");

const app = express();
const port = process.env.PORT || 8080;

const currentVersion = "v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


/**
 * Routes
 */
app.use("/api/" + currentVersion + "/", indexRouter);
app.use("/api/" + currentVersion+ "/docs", docsRouter);
app.use("/api/" + currentVersion + "/stocks", stockRouter);

module.exports = app;
exports.currentVersion = currentVersion;
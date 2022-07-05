const express = require("express");

const apiVersion = "v1"

const indexRouter = require("./routes/index");
const stockRouter = require("./routes/stocks");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


/**
 * Routes
 */
app.use("/api/" + apiVersion + "/", indexRouter);
app.use("/api/" + apiVersion + "/stocks", stockRouter);

module.exports = app;
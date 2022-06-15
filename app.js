const express = require("express");

const indexRouter = require("./routes/index");
const stockRouter = require("./routes/stocks");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


/**
 * Routes
 */
app.use("/", indexRouter);
app.use("/stocks", stockRouter);

module.exports = app;
const express = require('express');

const indexRouter = require('./routes/index');
const stockRouter = require('./routes/stocks');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/', indexRouter);
app.use('/stocks', stockRouter);

module.exports = app;
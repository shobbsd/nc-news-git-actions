const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const {
  handleCustomErrors,
  handlePsqlErrors
} = require('./errors/errorHandler');

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app;

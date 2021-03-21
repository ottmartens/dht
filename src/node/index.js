const logger = require('../utils/logger');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(routes);

const port = 3000 + Number(process.env.id);

app.listen(port, () => logger.debug(`Listening on port ${port}`));


process.on('exit', () => logger.debug('Node is shutting down'));

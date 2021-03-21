const logger = require('../utils/logger');
const express = require('express');

const app = express();

require('./routes')(app);

const port = 3000 + Number(process.env.id);

app.listen(port, () => logger.debug(`Listening on port ${port}`));

process.on('exit', () => logger.debug('Node is shutting down'));

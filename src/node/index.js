const logger = require('../utils/logger');
const express = require('express');

const { id, successor, nextSuccessor, keySpace } = require('./nodeData');
const broadcastJoining = require('./broadcastJoining');

const app = express();

require('./routes')(app);

const port = 3000 + id;

app.listen(port, () => broadcastJoining());

process.on('exit', () => logger.debug('Node is shutting down'));

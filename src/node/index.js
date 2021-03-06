const express = require('express');

const { id } = require('./nodeData');

const broadcastJoining = require('./broadcastJoining');

const app = express();
app.use(express.json());

require('./routes')(app);

const port = 3000 + id;

app.listen(port, () => broadcastJoining());

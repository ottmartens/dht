const logger = require('../utils/logger');
const axios = require('axios');

const { id } = require('./nodeData');

module.exports = async function () {
	const gatewayNode = Number(process.env.gatewayNode);

	const isFirstNode = gatewayNode === id;

	if (isFirstNode) {
		logger.debug('First node, noone to broadcast to');
		return;
	}

	logger.debug('broadcasting joining to ' + process.env.gatewayNode);

	try {
		await axios.post(`http://localhost:${3000 + gatewayNode}/new-node-join`, {
			newNodeId: id,
		});
	} catch (err) {
		logger.error(err);
	}
};

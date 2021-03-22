const axios = require('axios');

const nodeData = require('../../nodeData');
const logger = require('../../../utils/logger');
const { getUrlForNode } = require('../../utils/helpers');

module.exports = async (req, res) => {
	const { leavingNode } = req.body;

	logger.debug('ok, node ' + leavingNode + ' is leaving');

	if (nodeData.successor === leavingNode) {
		res.sendStatus(200);
		return;
	}

	await axios.post(`${getUrlForNode(nodeData.successor)}/node-leaving`, {
		leavingNode,
	});

	res.sendStatus(200);
};

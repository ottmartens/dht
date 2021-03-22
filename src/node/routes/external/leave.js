const axios = require('axios');
const logger = require('../../../utils/logger');

const nodeData = require('../../nodeData');
const { getUrlForNode } = require('../../utils/helpers');

// meant to be called at the node that will leave
module.exports = async (req, res) => {
	await axios.post(`${getUrlForNode(nodeData.successor)}/node-leaving`, {
		leavingNode: nodeData.id,
	});

	res.send(`Node ${nodeData.id} has successfully left`);
	logger.debug('Exiting on request to leave');
	process.exit(0);
};

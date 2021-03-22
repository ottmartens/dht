const axios = require('axios');
const logger = require('../../../utils/logger');

const nodeData = require('../../nodeData');
const { getUrlForNode } = require('../../utils/helpers');

// meant to be called at the node that will leave
module.exports = async (req, res) => {
	try {
		if (oneNodeLeft()) {
            logger.warn('Cannot leave as the last node')
			res.sendStatus(200);
            return;
		}

		logger.info('Preparing to leave, dispatching leaving message');

		await axios.post(`${getUrlForNode(nodeData.successor)}/node-leaving`, {
			leavingNode: {
				id: nodeData.id,
				successor: nodeData.successor,
				nextSuccessor: nodeData.nextSuccessor,
			},
		});

		res.send(`Node ${nodeData.id} has successfully left`);
		logger.debug('Exiting on request to leave');
		process.exit(0);
	} catch (err) {
		logger.error(`Something went wrong while node was leaving: ${err.message}`);
		res.sendStatus(500);
	}
};

function oneNodeLeft() {
	return (
		nodeData.id === nodeData.successor && nodeData.id === nodeData.nextSuccessor
	);
}

const logger = require('../utils/logger');
const axios = require('axios');

const { getUrlForNode, getSuccessorsFromNodeList } = require('./utils/helpers');
const nodeData = require('./nodeData');

module.exports = async function () {
	const gatewayNode = Number(process.env.gatewayNode);

	const isFirstNode = gatewayNode === nodeData.id;

	if (isFirstNode) {
		logger.debug('First node, noone to broadcast to');
		nodeData.successor = nodeData.id;
		nodeData.nextSuccessor = nodeData.id;
		return;
	}

	logger.debug('broadcasting joining to ' + process.env.gatewayNode);

	try {
		const { data: nodes } = await axios.post(
			`${getUrlForNode(gatewayNode)}/new-node-join`,
			{
				newNode: nodeData.id,
				gatewayNode,
			}
		);

		const { successor, nextSuccessor } = getSuccessorsFromNodeList(
			nodes,
			nodeData.id
		);
		nodeData.successor = successor;
		nodeData.nextSuccessor = nextSuccessor;

		logger.debug(
			`successors: ${nodeData.successor}, ${nodeData.nextSuccessor}`
		);
	} catch (err) {
		logger.error(err);
	}
};

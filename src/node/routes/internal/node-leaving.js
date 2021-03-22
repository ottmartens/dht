const axios = require('axios');

const nodeData = require('../../nodeData');
const logger = require('../../../utils/logger');
const { getUrlForNode } = require('../../utils/helpers');

module.exports = async (req, res) => {
	const { leavingNode } = req.body;

	if (nodeData.successor !== leavingNode.id) {
		await axios.post(`${getUrlForNode(nodeData.successor)}/node-leaving`, {
			leavingNode,
		});
	}

	updateSuccessorsIfNeeded(leavingNode);

	// TODO: clean shortcuts if has shortcut to leaving node

	res.sendStatus(200);
};

function updateSuccessorsIfNeeded(leavingNode) {
	if (twoNodesLeft()) {
		nodeData.successor = nodeData.id;
		logger.debug(
			`updated successors: ${nodeData.successor}, ${nodeData.nextSuccessor}`
		);
		return;
	}

	if (threeNodesLeft()) {
		if (leavingNode.id == nodeData.successor) {
			nodeData.successor = nodeData.nextSuccessor;
			nodeData.nextSuccessor = nodeData.id;
		} else if (leavingNode.id === nodeData.nextSuccessor) {
			nodeData.nextSuccessor = nodeData.id;
		}
		logger.debug(
			`updated successors: ${nodeData.successor}, ${nodeData.nextSuccessor}`
		);
		return;
	}

	if (nodeData.successor === leavingNode.id) {
		nodeData.successor = nodeData.nextSuccessor;
		nodeData.nextSuccessor = leavingNode.nextSuccessor;
		logger.debug(
			`updated successors: ${nodeData.successor}, ${nodeData.nextSuccessor}`
		);
		return;
	}

	if (nodeData.nextSuccessor === leavingNode.id) {
		nodeData.nextSuccessor = leavingNode.successor;
		logger.debug(
			`updated successors: ${nodeData.successor}, ${nodeData.nextSuccessor}`
		);

		return;
	}
}

function twoNodesLeft() {
	return (
		nodeData.id !== nodeData.successor && nodeData.id === nodeData.nextSuccessor
	);
}

function threeNodesLeft() {
	return nodeData.id === nodeData.nextSuccessor;
}

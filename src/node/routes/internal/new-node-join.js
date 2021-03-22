const axios = require('axios');

const logger = require('../../../utils/logger');
const {
	getUrlForNode,
	getSuccessorsFromNodeList,
} = require('../../utils/helpers');
const nodeData = require('../../nodeData');

module.exports = async (req, res) => {
	try {
		const { newNode, gatewayNode } = req.body;

		let response;

		if (isLastNode(gatewayNode)) {
			response = [nodeData.id];
		} else {
			const { data } = await axios.post(
				`${getUrlForNode(nodeData.successor)}/new-node-join`,
				{
					gatewayNode,
					newNode,
				}
			);

			response = data.concat([nodeData.id]);
		}

		updateSuccessorsIfNeeded(newNode);

		res.send(response);
	} catch (err) {
		logger.error(err);
		return;
	}
};

function updateSuccessorsIfNeeded(newNode) {
	if (isSecondNodeJoining()) {
		nodeData.successor = newNode;
	} else if (isThirdNodeJoining(newNode)) {
		const { successor, nextSuccessor } = getSuccessorsFromNodeList(
			[nodeData.successor, nodeData.nextSuccessor, newNode],
			nodeData.id
		);

		nodeData.successor = successor;
		nodeData.nextSuccessor = nextSuccessor;
	} else {
		handleMoreThanThirdNodeJoining(newNode);
	}

	logger.debug(`successors: ${nodeData.successor}, ${nodeData.nextSuccessor}`);
}

function isLastNode(gatewayNode) {
	return nodeData.successor === gatewayNode || !nodeData.successor;
}

function isSecondNodeJoining() {
	return (
		nodeData.id === nodeData.successor && nodeData.id === nodeData.nextSuccessor
	);
}

function isThirdNodeJoining() {
	return nodeData.id === nodeData.nextSuccessor;
}

function handleMoreThanThirdNodeJoining(newNode) {
	const isLastNode = nodeData.id > nodeData.successor;

	const isSecondToLastNode =
		nodeData.id < nodeData.successor && nodeData.id > nodeData.nextSuccessor;

	if (isLastNode) {
		if (newNode > nodeData.id || newNode < nodeData.successor) {
			nodeData.nextSuccessor = nodeData.successor;
			nodeData.successor = newNode;
		} else if (
			newNode > nodeData.successor &&
			newNode < nodeData.nextSuccessor
		) {
			nodeData.nextSuccessor = newNode;
		}
	} else if (isSecondToLastNode) {
		if (newNode > nodeData.id && newNode < nodeData.successor) {
			nodeData.nextSuccessor = nodeData.successor;
			nodeData.successor = newNode;
		} else if (newNode > nodeData.successor) {
			nodeData.nextSuccessor = newNode;
		}
	} else {
		if (newNode > nodeData.id && newNode < nodeData.successor) {
			nodeData.nextSuccessor = nodeData.successor;
			nodeData.successor = newNode;
		} else if (
			newNode > nodeData.successor &&
			newNode < nodeData.nextSuccessor
		) {
			nodeData.nextSuccessor = newNode;
		}
	}
}

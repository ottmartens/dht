const logger = require('../../../utils/logger');
const nodeData = require('../../nodeData');
const axios = require('axios');
const { getUrlForNode } = require('../../utils/helpers');

module.exports = async (req, res) => {
	logger.debug('Listing all nodes from ' + nodeData.id);

	try {
		const response = await axios.get(
			`${getUrlForNode(nodeData.successor)}/list-nodes`, {
			params: {
				origin: nodeData.id
			}
		}
		);
		res.send(
			response.data
				.concat([
					{
						node: nodeData.id,
						shortcuts: nodeData.shortcuts,
						successor: nodeData.successor,
						nextSuccessor: nodeData.nextSuccessor,
					},
				])
				.sort((a, b) => a.node - b.node)
		);
	} catch (err) {
		logger.error(err);
	}
};

const logger = require('../../../utils/logger');
const nodeData = require('../../nodeData');
const axios = require('axios');

module.exports = async (req, res) => {
	logger.debug('Listing all nodes from ' + nodeData.id);

	try {
		const response = await axios.get(
			`http://localhost:${3000 + nodeData.successor}/list-nodes?origin=${nodeData.id}`
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

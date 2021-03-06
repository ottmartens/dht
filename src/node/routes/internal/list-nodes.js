const logger = require('../../../utils/logger');
const nodeData = require('../../nodeData');
const axios = require('axios');
const { getUrlForNode } = require('../../utils/helpers');

module.exports = async (req, res) => {
	const nodeObject = {
		node: nodeData.id,
		shortcuts: nodeData.shortcuts,
		successor: nodeData.successor,
		nextSuccessor: nodeData.nextSuccessor,
	};

	if (Number(req.query.origin) !== nodeData.successor) {
		logger.debug('Responding to listing');

		try {
			const response = await axios.get(
				`${getUrlForNode(nodeData.successor)}/list-nodes`,
				{
					params: {
						origin: req.query.origin,
					},
				}
			);
			res.send(response.data.concat([nodeObject]));
		} catch (err) {
			logger.error(err);
		}
	} else {
		logger.debug('Responding to listing, last node');
		res.send([nodeObject]);
	}
};

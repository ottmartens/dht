const logger = require('../../../utils/logger');
const { id, successor, nextSuccessor, shortcuts } = require('../../nodeData');
const axios = require('axios');

module.exports = async (req, res) => {
	const nodeData = {
		node: id,
		shortcuts,
		successor,
		nextSuccessor,
	};

	if (Number(req.query.origin) !== successor) {
		logger.debug('Listing all nodes from origin ' + req.query.origin);
		try {
			const response = await axios.get(
				`http://localhost:${3000 + successor}/list-nodes?origin=${
					req.query.origin
				}`
			);
			res.send(response.data.concat([nodeData]));
		} catch (err) {
			logger.error(err);
		}
	} else {
		logger.debug('Reached the end because the successor is node ' + successor);
		res.send([nodeData]);
	}
};

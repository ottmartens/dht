const logger = require('../../../utils/logger');
const { id, successor, nextSuccessor, shortcuts } = require('../../nodeData');
const axios = require('axios');

module.exports = async (req, res) => {
	logger.debug('Listing all nodes from ' + id);

	try {
		const response = await axios.get(`http://localhost:${3000 + successor}/list-nodes?origin=${id}`)
		res.send(
			response.data.concat([{
				node: id,
				shortcuts,
				successor,
				nextSuccessor
			}])
		)
	} catch (err) {
		logger.error(err);
	}

};

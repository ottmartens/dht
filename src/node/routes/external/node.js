const logger = require('../../../utils/logger');
const { id, successor, nextSuccessor, shortcuts } = require('../../nodeData');
const axios = require('axios');

module.exports = async (req, res) => {
	const target = Number(req.query.target);
	const jumps = req.query.jumps ? Number(req.query.jumps) : 0;
	const isTarget = req.query.isSuccessorTarget === "true" ? true : false;

	// TODO use shortcuts!

	if ((!isTarget) && (target !== id)) {
		logger.debug('Find node ' + target);
		//const isSuccessorTarget = target > id && target < successor; //Case 1, works only if target is bound between given nodes.
		const isSuccessorTarget = (target > id && target < successor) ||
			(id > successor && (target > id || target < successor)); //Case 2
		try {
			const response = await axios.get(`http://localhost:${3000 + successor}/node?target=${target}&jumps=${jumps + 1}&isSuccessorTarget=${isSuccessorTarget}`)
			res.send(
				response.data
			)
		} catch (err) {
			logger.error(err);
		}
	} else {
		logger.debug('Found the correct node!');
		res.send({
			message: `Data stored in node ${id}, ${jumps} requests sent`,
		}
		)

	}

};

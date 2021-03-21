const logger = require('../../utils/logger');

module.exports = (req, res) => {
	logger.debug('Handling new node join');

	res.send('ok, new node has joined');
};

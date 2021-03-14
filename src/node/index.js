const logger = require('../utils/logger');

logger.debug('Node is started');

setTimeout(() => {
	process.exit(0);
}, 2000);

process.on('exit', () => logger.debug('Node is shutting down'));

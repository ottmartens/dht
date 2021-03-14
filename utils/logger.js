const { createLogger, transports, format } = require('winston');

module.exports = createLogger({
	transports: [new transports.Console({ colorize: true, level: 'debug' })],
	format: format.combine(
		format.timestamp({ format: 'HH:mm:ss' }),
		format.colorize(),
		format.printf(({ message, level, timestamp }) => {
			const nodeId = process.env.id;

			if (nodeId) {
				return `${timestamp} [${level}] Node ${nodeId.padEnd(
					4
				)} - ${message}`;
			}

			return `${timestamp} [${level}] \t   - ${message}`;
		})
	),
});

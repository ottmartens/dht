const { createLogger, transports, format } = require('winston');

module.exports = createLogger({
	transports: [new transports.Console({ colorize: true, level: 'debug' })],
	format: format.combine(
        format.colorize(),
		format.printf(({ message, level }) => {
			const nodeId = process.env.id;

			if (nodeId) {
				return `[${level}]\t Node ${nodeId.padEnd(4)} - ${message}`;
			}

			return `[${level}]\t\t   - ${message}`;
		})
	),
});

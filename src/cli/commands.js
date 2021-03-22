const axios = require('axios');

const spawnNode = require('../utils/spawnNode');
const { getUrlForNode } = require('../node/utils/helpers');
const stats = require('../currentStats');
const logger = require('../utils/logger');

module.exports = {
	join: {
		args: ['node id'],
		validate: (commandArgs) => {
			if (commandArgs.length !== 1 || isNaN(Number(commandArgs[0]))) {
				return false;
			}

			const key = Number(commandArgs[0]);

			const [start, end] = stats.getKeySpace();

			return key >= start && key <= end;
		},
		handler: async (nodeId) => {
			const id = Number(nodeId);

			spawnNode({
				id,
				keySpace: JSON.stringify(stats.getKeySpace()),
				gatewayNode: stats.getNodes()[0],
			});

			stats.setNodes(stats.getNodes().concat([id]));
		},
	},

	leave: {
		args: ['node id'],
		validate: (commandArgs) => {
			return commandArgs.length === 1 && !isNaN(Number(commandArgs[0]));
		},
		handler: async (nodeId) => {
			const id = Number(nodeId);

			try {
				await axios.post(`${getUrlForNode(id)}/leave`);
			} catch (err) {
				logger.error(err);
			}
		},
	},
};

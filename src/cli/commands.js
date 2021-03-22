const spawnNode = require('../utils/spawnNode');

const stats = require('../currentStats');

module.exports = {
	join: {
		args: ['node id'],
		validate: (commandArgs) => {
			return commandArgs.length === 1 && !isNaN(Number(commandArgs[0]));
		},
		handler: async (nodeId) => {

            const id = Number(nodeId)

			spawnNode({
				id,
				keySpace: JSON.stringify(stats.getKeySpace()),
				gatewayNode: stats.getNodes()[0],
			});

			stats.setNodes(stats.getNodes().concat([id]));
			console.log(stats.getNodes());
		},
	},
};

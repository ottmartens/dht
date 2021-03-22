const axios = require('axios');

const spawnNode = require('../utils/spawnNode');
const { getUrlForNode } = require('../node/utils/helpers');
const stats = require('../currentStats');
const logger = require('../utils/logger');
const { delay } = require('../utils/helpers');

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

			await delay(200);
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

	list: {
		args: [],
		validate: () => {
			return true;
		},
		handler: async () => {
			const gatewayNode = Number(stats.getNodes()[0]);
			try {
				const response = await axios.get(`${getUrlForNode(gatewayNode)}/list`);
				console.log('');
				response.data.forEach((node) => {
					console.log(
						`${node.node}:${node.shortcuts
							.map((shortcut) => shortcut.end)
							.join(',')}, S-${node.successor}, NS-${node.nextSuccessor}`
					);
				});
			} catch (err) {
				logger.error(err);
			}
		},
	},

	lookup: {
		args: ['target id:[node id - optional]'],
		validate: (commandArgs) => {
			if (commandArgs.length !== 1) {
				return false;
			}

			const numbers = commandArgs[0].split(':');

			return numbers.length <= 2 && !isNaN(Number(numbers[0]));
		},
		handler: async (numbers) => {
			const [targetId, nodeId] = numbers.split(':');

			const target = Number(targetId);
			const id = nodeId ? Number(nodeId) : Number(stats.getNodes()[0]);
			try {
				const response = await axios.get(
					`${getUrlForNode(id)}/lookup?target=${target}`
				);
				console.log(response.data);
			} catch (err) {
				logger.error(`Cannot perform lookup - ${err}`);
			}
		},
	},

	shortcut: {
		args: ['from id', 'to id'],
		validate: (commandArgs) => {
			return (
				commandArgs.length === 2 &&
				!isNaN(Number(commandArgs[0])) &&
				!isNaN(Number(commandArgs[1]))
			);
		},
		handler: async (fromId, toId) => {
			const from = Number(fromId);
			const to = Number(toId);

			const gatewayNode = Number(stats.getNodes()[0]);

			try {
				await axios.get(
					`${getUrlForNode(gatewayNode)}/new-shortcut?from=${from}&to=${to}`
				);
			} catch (err) {
				logger.error(err);
			}
		},
	},
};

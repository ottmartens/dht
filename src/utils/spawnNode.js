const { exec } = require('child_process');
const logger = require('./logger');
const stats = require('../currentStats');

module.exports = function spawnNode({ id, shortcuts, keySpace, gatewayNode }) {
	const nodeProcess = exec(
		`node  ./src/node/index.js`,
		{
			env: { id, shortcuts, keySpace, gatewayNode },
		},
		() => {
			logger.info(`Node ${id} exited`);

			const currentNodes = stats.getNodes();
			currentNodes.splice(currentNodes.indexOf(id), 1);

			stats.setNodes(currentNodes);
		}
	);

	attachLogging(nodeProcess);
};

function attachLogging(nodeProcess) {
	nodeProcess.stdout.pipe(process.stdout);
	nodeProcess.stderr.pipe(process.stderr);
}

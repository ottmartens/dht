const { exec } = require('child_process');
const logger = require('./logger');
const path = require('path');

module.exports = function spawnNode({ id, shortcuts, keySpace, gatewayNode, successor, nextSuccessor }) {
	const nodeProcess = exec(
		`node  ./src/node/index.js`,
		{
			env: { id, shortcuts, keySpace, gatewayNode, successor, nextSuccessor },
		},
		() => {
			logger.info(`Node ${id} exited`);
		}
	);

	attachLogging(nodeProcess);
};

function attachLogging(nodeProcess) {
	nodeProcess.stdout.pipe(process.stdout);
	nodeProcess.stderr.pipe(process.stderr);
}

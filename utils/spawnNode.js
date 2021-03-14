const { exec, spawn } = require('child_process');
const logger = require('./logger');


module.exports = function spawnNode({ id, shortcuts, keySpace }) {
	const nodeProcess = exec(
		`node ./node/index.js`,
		{
			env: { id, shortcuts, keySpace },
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

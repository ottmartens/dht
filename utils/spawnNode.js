const { exec } = require('child_process');

module.exports = function spawnNode({ id, shortcuts, keySpace }) {
	const nodeProcess = exec(
		`node ./node/index.js`,
		{
			env: {
				id,
				shortcuts,
				keySpace,
			},
		},
		() => {
			console.log(`Node ${id} exited`);
		}
	);

	attachLogging(nodeProcess);
};

function attachLogging(nodeProcess) {
	nodeProcess.stdout.pipe(process.stdout);
	nodeProcess.stderr.pipe(process.stderr);
}

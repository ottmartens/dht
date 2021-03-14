const fs = require('fs');
const readline = require('readline');

module.exports = async function parseInputFile(fileName) {
	return await new Promise((resolve) => {
		let keySpace, nodes, shortcuts;

		const readInterface = readline.createInterface({
			input: fs.createReadStream(fileName),
		});

		readInterface.on('line', (line) => {
			if (line.startsWith('#')) {
				return;
			}

			if (!keySpace) {
				keySpace = line.split(',').map(Number);
				return;
			}

			if (!nodes) {
				nodes = line.split(',').map(Number);
				return;
			}

			if (!shortcuts) {
				shortcuts = line.split(',').map((string) => {
					const [start, end] = string.split(':').map(Number);

					return {
						start,
						end,
					};
				});

				resolve({ keySpace, nodes, shortcuts });
			}
		});
	});
};

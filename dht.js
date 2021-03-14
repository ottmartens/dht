const { parseInputFile, spawnNode, logger } = require('./utils');

async function bootstrap() {
	const inputFile = process.argv[2];

	const { keySpace, nodes, shortcuts } = await parseInputFile(inputFile);

	for (const node of nodes) {
		const nodeShortcuts = shortcuts.filter(
			(shortcut) => shortcut.start === node
		);

        logger.info(`Spawning node ${node}`)

		spawnNode({
			id: node,
			shortcuts: nodeShortcuts,
			keySpace,
		});
	}
}

bootstrap();

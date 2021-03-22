const {
	parseInputFile,
	spawnNode,
	logger,
	helpers: { delay },
} = require('./utils');

let gatewayNode = null;

async function bootstrap() {
	const inputFile = process.argv[2];

	const { keySpace, nodes, shortcuts } = await parseInputFile(inputFile);

	gatewayNode = nodes[0];

	for (const node of nodes) {
		const nodeShortcuts = shortcuts.filter(
			(shortcut) => shortcut.start === node
		);

		logger.info(`Spawning node ${node}`);

		spawnNode({
			id: node,
			shortcuts: JSON.stringify(nodeShortcuts),
			keySpace,
			gatewayNode,
		});

		await delay(500);
	}
}

bootstrap();

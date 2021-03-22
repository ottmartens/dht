const {
	parseInputFile,
	spawnNode,
	logger,
	helpers: { delay },
} = require('./utils');

const cli = require('./cli');

const stats = require('./currentStats');

async function bootstrap() {
	const inputFile = process.argv[2];

	const input = await parseInputFile(inputFile);

	stats.setNodes(input.nodes);
	stats.setKeySpace(input.keySpace);

	const initialShortcurs = input.shortcuts;

	const gatewayNode = stats.getNodes()[0];

	for (const node of stats.getNodes()) {
		const nodeShortcuts = initialShortcurs.filter(
			(shortcut) => shortcut.start === node
		);

		logger.info(`Spawning node ${node}`);

		spawnNode({
			id: node,
			shortcuts: JSON.stringify(nodeShortcuts),
			keySpace: JSON.stringify(stats.getKeySpace()),
			gatewayNode,
		});

		await delay(500);
	}
}

async function main() {
	await bootstrap();
	cli.run();
}

main();

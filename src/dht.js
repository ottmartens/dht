const { nextSuccessor } = require('./node/nodeData');
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

	for (const [index, node] of nodes.sort(((a, b) => a - b)).entries()) {
		const nodeShortcuts = shortcuts.filter(
			(shortcut) => shortcut.start === node
		);

		logger.info(`Spawning node ${node}`);

		spawnNode({
			id: node,
			shortcuts: JSON.stringify(nodeShortcuts),
			keySpace: JSON.stringify(keySpace),
			gatewayNode,
			successor: index === nodes.length - 1 ? nodes[0] : nodes[index + 1],
			nextSuccessor: index === nodes.length - 2 ? nodes[0]
				: index === nodes.length - 1 ? nodes[1] : nodes[index + 2]
		});

		await delay(200);
	}
}

bootstrap();

const logger = require('../utils/logger');
const commands = require('./commands');

function printHelp() {
	for (const [commandName, { args }] of Object.entries(commands)) {
		console.log(`\t ${commandName} ${args.map((s) => `<${s}> `)}`);
	}
}

async function executeCommand(args) {
	const [commandName, ...commandArgs] = args;

	const command = commands[commandName];

	if (!command) {
		console.log('\n No such command. Usage: ');
		printHelp();
		return;
	}

	const validArgs = command.validate(commandArgs);
	if (!validArgs) {
		console.log(`Invalid arguments for ${commandName}`);

		console.log('\n Usage: ');
		printHelp();
		return;
	}

	await command.handler(...commandArgs);

	console.log('\nExecuted successfully. Reacy to accept new command');
}

function run() {
	const lineReader = require('readline').createInterface({
		input: process.stdin,
	});

	lineReader.on('line', async (line) => {
		try {
			await executeCommand(line.split(' '));
		} catch (err) {
			logger.error(err);
			console.log('Something went wrong while executing the last command.');
			printHelp();
		}
	});

	console.log('\n Now ready to accept commands. Available commands:');
	printHelp();
}

module.exports = {
	run,
};

const { Command } = require('commander');
const axios = require('axios');

const program = new Command();

/* program
    .version('0.0.1')
    .option('-c, --config <path>', 'set config path', './deploy.conf');

program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
    .action((env, options) => {
        env = env || 'all';
        console.log('read config from %s', program.opts().config);
        console.log('setup for %s env(s) with %s mode', env, options.setup_mode);
    });

program
    .command('exec <script>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option('-e, --exec_mode <mode>', 'Which exec mode to use', 'fast')
    .action((script, options) => {
        console.log('read config from %s', program.opts().config);
        console.log('exec "%s" using %s mode and config %s', script, options.exec_mode, program.opts().config);
    }).addHelpText('after', `
Examples:
  $ deploy exec sequential
  $ deploy exec async`
    ); */

program
    .command('list <nodeId>')
    .description('list all nodes')
    //.option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
    .action(async (nodeId, options) => {

        const response = await axios.get(`http://localhost:${3000 + Number(nodeId)}/list`)
        response.data.forEach(node => {
            console.log(`${node.node}:${node.shortcuts.map(shortcut => shortcut.end).join(",")}, S-${node.successor}, NS-${node.nextSuccessor}`)
        });
    });

program
    .command('lookup <targetId> <nodeId>')
    .description('lookup for a node')
    //.option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
    .action(async (targetId, nodeId, options) => {

        const response = await axios.get(`http://localhost:${3000 + Number(nodeId)}/lookup?target=${Number(targetId)}`)
        console.log(response.data)
    });


program.parseAsync(process.argv);
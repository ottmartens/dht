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

program
    .command('shortcut <fromId> <toId> <nodeId>')
    .description('shortcut from a node to another')
    //.option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
    .action(async (fromId, toId, nodeId) => {

        const response = await axios.get(`http://localhost:${3000 + Number(nodeId)}/new-shortcut?from=${Number(fromId)}&to=${Number(toId)}`)
        console.log(response.data)
    });
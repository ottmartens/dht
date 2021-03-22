const nodeData = {
	id: Number(process.env.id),
	successor: null,
	nextSuccessor: null,

	keySpace: process.env.keySpace ? JSON.parse(process.env.keySpace) : null,
	shortcuts: process.env.shortcuts ? JSON.parse(process.env.shortcuts) : null,
};

module.exports = {
	id: nodeData.id,
	set successor(successor) {
		nodeData.successor = successor;
	},
	set nextSuccessor(nextSuccessor) {
		nodeData.nextSuccessor = nextSuccessor;
	},
	set shortcuts(shortcuts) {
		nodeData.shortcuts = shortcuts;
	},
	get successor() {
		return nodeData.successor;
	},
	get nextSuccessor() {
		return nodeData.nextSuccessor;
	},

	get keySpace() {
		return nodeData.keySpace;
	},
	get shortcuts() {
		return nodeData.shortcuts;
	},
};

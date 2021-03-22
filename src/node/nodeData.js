const nodeData = {
	id: Number(process.env.id),
	successor: null,
	nextSuccessor: null,

	shortcuts: process.env.shortcuts ? JSON.parse(process.env.shortcuts) : '',
};

module.exports = {
	id: nodeData.id,
	set successor(successor) {
		nodeData.successor = successor;
	},
	set nextSuccessor(nextSuccessor) {
		nodeData.nextSuccessor = nextSuccessor;
	},
	get successor() {
		return nodeData.successor;
	},
	get nextSuccessor() {
		return nodeData.nextSuccessor;
	},
};

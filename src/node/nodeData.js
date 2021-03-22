
module.exports = {
	id: Number(process.env.id),
	keySpace: process.env.keySpace ? JSON.parse(process.env.keySpace): "",
	successor: Number(process.env.successor),
	nextSuccessor: Number(process.env.nextSuccessor),
	shortcuts: process.env.shortcuts ? JSON.parse(process.env.shortcuts) : "",
	setSuccessor: (successor) => {
		this.successor = successor;
	},
};;

module.exports = {
	id: Number(process.env.id),
	successor: Number(process.env.successor),
	nextSuccessor: Number(process.env.nextSuccessor),
	shortcuts: process.env.shortcuts ? JSON.parse(process.env.shortcuts) : "",
	setSuccessor: (successor) => {
		this.successor = successor;
	},
};;
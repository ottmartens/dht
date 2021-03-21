
module.exports = {
	id: Number(process.env.id),
	successor: Number(process.env.successor),
	nextSuccessor: Number(process.env.nextSuccessor),
	setSuccessor: (successor) => {
		this.successor = successor;
	},
};;
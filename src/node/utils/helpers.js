function getUrlForNode(nodeId) {
	return `http://localhost:${3000 + nodeId}`;
}

function getSuccessorsFromNodeList(list, node) {
	if (!list.includes(node)) {
		list.push(node);
	}

	// filter out duplicates
	list = [...new Set(list)];

	list.sort((a, b) => a - b);

	const index = list.indexOf(node);

	return {
		successor: index === list.length - 1 ? list[0] : list[index + 1],
		nextSuccessor:
			index === list.length - 2
				? list[0]
				: index === list.length - 1
				? list[1]
				: list[index + 2],
	};
}

module.exports = {
	getUrlForNode,
	getSuccessorsFromNodeList,
};

let keySpace = null;
let currentNodes = [];

module.exports = {
	getNodes: () => currentNodes,
	setNodes: (nodes) => (currentNodes = [...nodes]),
	setKeySpace: (newKeySpace) => (keySpace = newKeySpace),
	getKeySpace: () => keySpace,
};

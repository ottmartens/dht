const logger = require('../../../utils/logger');
const nodeData = require('../../nodeData');
const axios = require('axios');
const { getUrlForNode } = require('../../utils/helpers');

module.exports = async (req, res) => {
	const target = Number(req.query.target);
	const jumps = req.query.jumps ? Number(req.query.jumps) : 0;
	const isTarget = req.query.isSuccessorTarget === 'true' ? true : false;

	if (!isTarget && target !== nodeData.id) {
		logger.debug('Find node ' + target);

		//const isSuccessorTarget = target > id && target < successor; //Case 1, works only if target is bound between given nodes.
		const isSuccessorTarget =
			(target > nodeData.id && target < nodeData.successor) ||
			(nodeData.id > nodeData.successor && (target > nodeData.id || target < nodeData.successor)); //Case 2

		let usableShortcut;
		if (nodeData.shortcuts.length) {
			let minDistance;
			nodeData.shortcuts.forEach(({ end: shortcut }) => {
				if (!isSuccessorTarget && (shortcut <= target || (shortcut > target && nodeData.id > target && shortcut > nodeData.id))) {
					if (!usableShortcut) {
						usableShortcut = shortcut
						minDistance = shortcut < target ? target - shortcut : nodeData.keySpace[1] - shortcut + target
					} else if (shortcut <= target && ((target - shortcut) < minDistance)) {
						usableShortcut = shortcut;
						minDistance = target - shortcut;
					} else if (shortcut >= target && ((nodeData.keySpace[1] - shortcut + target) < minDistance)) {
						usableShortcut = shortcut;
						minDistance = nodeData.keySpace[1] - shortcut + target;
					}
				}
			});
		}

		usableShortcut && logger.debug('Will use shortcut to node ' + usableShortcut);

		//shortcut can never be the target (unless its id is equal to the target), 
		//because in the previous statement we eliminated the possibility of the shortcut being bigger than the target

		try {
			const response = await axios.get(`${getUrlForNode(usableShortcut || nodeData.successor)}/lookup`,
				{
					params: {
						target,
						jumps: jumps + 1,
						isSuccessorTarget: isSuccessorTarget && !usableShortcut
					}
				})
			res.send(
				response.data
			)
		} catch (err) {
			logger.error(err);
		}
	} else {
		logger.debug('Found the correct node!');
		res.send({
			message: `Data stored in node ${nodeData.id}, ${jumps} requests sent`,
		});
	}
};

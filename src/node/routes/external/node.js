const logger = require('../../../utils/logger');
const { id, successor, shortcuts, keySpace } = require('../../nodeData');
const axios = require('axios');

module.exports = async (req, res) => {
	const target = Number(req.query.target);
	const jumps = req.query.jumps ? Number(req.query.jumps) : 0;
	const isTarget = req.query.isSuccessorTarget === "true" ? true : false;

	// TODO use shortcuts!

	if ((!isTarget) && (target !== id)) {
		logger.debug('Find node ' + target);

		//const isSuccessorTarget = target > id && target < successor; //Case 1, works only if target is bound between given nodes.
		const isSuccessorTarget = (target > id && target < successor) ||
			(id > successor && (target > id || target < successor)); //Case 2

		let usableShortcut;
		if (shortcuts.length) {
			let minDistance;
			shortcuts.forEach(({ end: shortcut }) => {
				if (!isSuccessorTarget && (shortcut <= target || (shortcut > target && id > target && shortcut > id))) {
					if (!usableShortcut) {
						usableShortcut = shortcut
						minDistance = shortcut < target ? target - shortcut : keySpace[1] - shortcut + target
					} else if (shortcut <= target && ((target - shortcut) < minDistance)) {
						usableShortcut = shortcut;
						minDistance = target - shortcut;
					} else if (shortcut >= target && ((keySpace[1] - shortcut + target) < minDistance)) {
						usableShortcut = shortcut;
						minDistance = keySpace[1] - shortcut + target;
					}
				}
			});
		}
		
		usableShortcut && logger.debug('Will use shortcut to node ' + usableShortcut);

		//shortcut can never be the target (unless its id is equal to the target), 
		//because in the previous statement we eliminated the possibility of the shortcut being bigger than the target

		try {
			const response = await axios.get(`http://localhost:${3000 + (usableShortcut || successor)}/node?target=${target}&jumps=${jumps + 1}&isSuccessorTarget=${isSuccessorTarget && !usableShortcut}`)
			res.send(
				response.data
			)
		} catch (err) {
			logger.error(err);
		}
	} else {
		logger.debug('Found the correct node!');
		res.send({
			message: `Data stored in node ${id}, ${jumps} requests sent`,
		}
		)

	}

};

module.exports = (app) => {
	// external endpoints
	app.get('/node', require('./external/node'));
	app.get('/nodes', require('./external/nodes'));
	app.post('/leave', require('./external/leave'));

	// internal endpoints for node-to-node communication
	app.post('/new-node-join', require('./internal/new-node-join'));
	app.get('/list-nodes', require('./internal/list-nodes'));
	app.post('/node-leaving', require('./internal/node-leaving'));
};

module.exports = (app) => {
	// external endpoints
	app.get('/lookup', require('./external/lookup'));
	app.get('/new-shortcut', require('./external/new-shortcut'));
	app.get('/list', require('./external/list'));
	app.post('/leave', require('./external/leave'));

	// internal endpoints for node-to-node communication
	app.post('/new-node-join', require('./internal/new-node-join'));
	app.get('/list-nodes', require('./internal/list-nodes'));
	app.post('/node-leaving', require('./internal/node-leaving'));
};

module.exports = (app) => {
	app.post('/new-node-join', require('./internal/new-node-join'));
	app.get('/nodes', require('./external/nodes'));
	app.get('/list-nodes', require('./internal/list-nodes'));

};

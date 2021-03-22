module.exports = (app) => {

    // external endpoints
	app.get('/node', require('./external/node'));
	app.get('/nodes', require('./external/nodes'));

    // internal endpoints for node-to-node communication
	app.post('/new-node-join', require('./internal/new-node-join'));
	app.get('/list-nodes', require('./internal/list-nodes'));

};

module.exports = (app) => {
	app.post('/new-node-join', require('./internal/new-node-join'));
};

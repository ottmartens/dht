module.exports = (app) => {
	app.post('/new-node-join', require('./new-node-join'));
};

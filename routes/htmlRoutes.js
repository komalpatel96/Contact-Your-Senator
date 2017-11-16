var path = require('path');

module.exports = function(app) {
	// console.log('___ENTER htmlRoutes.js___');

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../views/index.html'));
	});

};
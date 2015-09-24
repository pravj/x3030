/* GET home page */
exports.index = function(req, res) {
	res.render('index', { title: 'x3030' });
}

/* GET maze data in JSON format */
exports.maze = function(req, res) {
	res.send('MAZE');
}
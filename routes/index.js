var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (typeof req.cookies.level == 'undefined') {
		res.cookie('level', 1);
	} else {
		res.cookie('level', parseInt(req.cookies.level) + 1);
	};

	res.render('index', { title: 'x3030' });
});

module.exports = router;

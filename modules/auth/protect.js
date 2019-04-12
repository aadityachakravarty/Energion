const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
	// check header or url parameters or post parameters for token
	let token = req.body.token || req.params.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, cfg.sign, (err, info) => {
			if (err) {
				res.json({
					success: false,
					msg: err.message
				});
			} else {
				if (info) {
					req.info = info;
					next();
				}
				else {
					res.json({
						success: false,
						msg: 'Token not valid.'
					});
				}
			}
		});
	}
	else {
		// if there is no token then return an error
		res.json({
			success: false,
			msg: 'No token provided.'
		});
	}
}

module.exports = protect;
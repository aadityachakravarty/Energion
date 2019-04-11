const jwt = require('jsonwebtoken');

const userModel = require(__base + 'models/user.js');

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
					userModel.findById(info.id).exec((err, user) => {
						if (err) {
							res.json({
								success: false,
								msg: err.message
							});
						}
						else {
							if (!user) {
								// Check if the username mentioned in the token exists.
								res.json({
									success: false,
									msg: 'Failed to authenticate token.'
								});
							} else {
								req.info = {
									id: user._id,
									name: user.fullname,
									email: user.email,
									admin: user.level == 5 ? true : false,
									lineman: user.level == 2 ? true : false,
									phone: user.phone
								};
								next();
							}
						}
					});
				}
				else {
					res.json({
						success: false,
						msg: 'User not found.'
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
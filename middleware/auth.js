const jwt = require('jsonwebtoken');
const config = require('config');
const jwtsecret = config.get('jsontoken');
module.exports = (req, res, next) => {
	const token = req.headers['jwt-auth-token'];

	if (!req.headers['jwt-auth-token']) {
		return res.status(400).json({ errors: [ { msg: 'Token Missing' } ] });
	}

	try {
		const decoded = jwt.verify(token, jwtsecret);
		req.user = decoded.userObj;
		next();
	} catch (error) {
		return res.status(500).json({ errors: [ { msg: error.message } ] });
	}
};

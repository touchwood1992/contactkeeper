const express = require('express');
const route = express.Router();

const { check, validationResult } = require('express-validator');
const config = require('config');
const jwtsecret = config.get('jsontoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../../model/User');
const auth = require('../../middleware/auth');
//@route    POST api/auth
//@Desc     Login
//@access   Public
route.post(
	'/',
	[
		[
			check('email', 'Enter valid email').isEmail(),
			check('password', 'Please enter minimum 6 character password').isLength({ min: 6 })
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			const emailExists = await userModel.findOne({ email });
			if (!emailExists) {
				return res.status(400).json({ errors: [ { msg: 'Email not found' } ] });
			}
			const pswdCompare = await bcrypt.compare(password, emailExists.password);
			if (!pswdCompare) {
				return res.status(400).json({ errors: [ { msg: 'Invalid Password' } ] });
			}

			const payload = { userObj: emailExists._id };

			jwt.sign(payload, jwtsecret, { expiresIn: 60 * 120 }, function(err, token) {
				if (err) {
					return res.status().json({ errors: [ { msg: err } ] });
				}
				return res.status(200).json({ token });
			});
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ errors: [ { msg: error.message } ] });
		}
	}
);

//@route 	GET  /api/auth
//@desc 	Get user detail
//@access	Protected
route.get('/', [ auth ], async (req, res) => {
	try {
		const userDetail = await userModel.findById(req.user).select('-password');
		if (!userDetail) {
			return res.status(500).json({ errors: [ { msg: 'Invalid user' } ] });
		}
		res.status(200).json(userDetail);
	} catch (error) {
		return res.status(500).json({ errors: [ { msg: error.message } ] });
	}
});

module.exports = route;

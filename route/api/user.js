const express = require('express');
const route = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwtsecret = config.get('jsontoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../../model/User');

//@route    POST  api/user/
//@desc     Signup user
//@access   Public
route.post(
	'/',
	[
		[
			check('name', 'Name is required').not().isEmpty(),
			check('email', 'Enter valid email').isEmail(),
			check('password', 'Please enter minimum 6 character password').isLength({ min: 6 })
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			const user = new userModel({ name, email, password });
			const emailExists = await userModel.findOne({ email });
			if (emailExists) {
				return res.status(400).json({ errors: [ { msg: 'Email Already Exists' } ] });
			}
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();
			const payload = { userObj: user.id };

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

module.exports = route;

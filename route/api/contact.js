const express = require('express');
const route = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const contactModel = require('../../model/Contact');

//@route    POST    api/contacts
//@descr    Create contact
//@access   Protected
route.post(
	'/',
	[ auth, [ check('name', 'Name is required').not().isEmpty(), check('email', 'Email is required').isEmail() ] ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const userId = req.user;
		const { name, email, phone } = req.body;
		try {
			const contactObj = new contactModel({ name, email, phone });
			contactObj.user = userId;
			await contactObj.save();
			return res.status(200).json(contactObj);
		} catch (error) {
			res.status(500).json({ errors: [ { msg: error.message } ] });
		}
	}
);

//@route    GET    api/contact
//@descr    GET all contacts
//@access   Protected
route.get('/', auth, async (req, res) => {
	const userId = req.user;

	try {
		const contacts = await contactModel.find({ user: userId });
		return res.status(200).json(contacts);
	} catch (error) {
		res.status(500).json({ errors: [ { msg: error.message } ] });
	}
});

//@Route    GET  api/contact
//@desc     Get particular Contact
//@access   protected
route.get('/:id', auth, async (req, res) => {
	const userId = req.user;
	const contactID = req.params['id'];
	try {
		const contact = await contactModel.findById(contactID);
		if (!contact) {
			return res.status(400).json({ errors: [ { msg: 'Invalid request' } ] });
		}
		if (String(contact.user) !== userId) {
			return res.status(400).json({ errors: [ { msg: 'Invalid user request' } ] });
		}
		res.status(200).json(contact);
	} catch (error) {
		res.status(500).json({ errors: [ { msg: error.message } ] });
	}
});

//@Route    PUT  api/contact
//@desc     Update contact
//@access   Protected
route.put('/:id', auth, async (req, res) => {
	const contactID = req.params['id'];
	const userId = req.user;
	const { name, email, phone } = req.body;
	try {
		const contact = await contactModel.findById(contactID);
		if (!contact) {
			return res.status(400).json({ errors: [ { msg: 'Invalid request' } ] });
		}

		if (String(contact.user) !== userId) {
			return res.status(400).json({ errors: [ { msg: 'Invalid user request' } ] });
		}
		const updatedContact = await contactModel.findByIdAndUpdate(contactID, { name, email, phone }, { new: true });

		return res.status(200).json(updatedContact);
	} catch (error) {
		res.status(500).json({ errors: [ { msg: error.message } ] });
	}
});

//@route    Delete    api/contacts
//@descr    delete particular contact
//@access   Protected
route.delete('/:id', auth, async (req, res) => {
	const contactID = req.params['id'];
	const userId = req.user;

	try {
		const contact = await contactModel.findById(contactID);
		if (!contact) {
			return res.status(400).json({ errors: [ { msg: 'Invalid request' } ] });
		}

		if (String(contact.user) !== userId) {
			return res.status(400).json({ errors: [ { msg: 'Invalid user request' } ] });
		}
		await contactModel.findByIdAndDelete(contactID);
		return res.status(200).json({ errors: [ { msg: 'Contact Deleted Successfully.' } ] });
	} catch (error) {
		res.status(500).json({ errors: [ { msg: error.message } ] });
	}
});
module.exports = route;

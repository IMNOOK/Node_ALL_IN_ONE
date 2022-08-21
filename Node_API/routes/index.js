const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { v4: uuidv4 } = require('uuid');
const items = require('../models/items');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try{
		let domains = req.user ? await items.Domain.getAll(req.user.id) : null;
		res.render('login', {
			user: req.user,
			domains: domains,
		})
	} catch(error){
		console.error(error);
		next(error);
	}
});


router.post('/domain', isLoggedIn, async (req, res, next) => {
	try{
		const result = await items.Domain.set(req.user.id, req.user.nick, req.body.host, req.body.type, uuidv4());
		res.redirect('/');
	} catch (error) {
		console.error(error);
		next(error);
	}
});
	
module.exports = router;
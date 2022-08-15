const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try{
		
	}
});


router.post('/domain', isLoggedIn, domain);
	
module.exports = router;
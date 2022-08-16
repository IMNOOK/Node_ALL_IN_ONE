const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try{
		
	} catch(error){
		
	}
});


router.post('/domain', isLoggedIn);
	
module.exports = router;
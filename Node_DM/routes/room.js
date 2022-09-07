const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
	return res.render('chat', );
})

router.get('/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	return res.render('chat', );
})

module.exports = router;
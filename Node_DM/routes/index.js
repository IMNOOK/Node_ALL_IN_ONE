const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'https://node-all-in-one-api.run.goorm.io/v1';
axios.defaults.headers.origin = 'https://node-all-in-one-dm.run.goorm.io';
const request = async (req, api) => {
	try{
		if (!req.session.jwt) {
			const tokenResult = await axios.post(`${URL}/token`, {
				clientSecret: process.env.CLIENT_SECRET,
			});
			req.session.jwt = tokenResult.data.token;
		}
		return await axios.get(`${URL}${api}`, {
			headers: { authorization: req.session.jwt },
		});
	} catch(err) {
		if( err.response.status === 419) {
			delete req.session.jwt;
			return request(req, api);
		}
		return err.response;
	}
}

router.get('/test', async (req, res) => {
	try{
		const result = await request(req, '/test');
		return res.json(result.data);	
	} catch(err) {
		console.error(err);
		next(err);
	}
})

router.get('/follow', async (req, res) => {
	try{
		const result = await request(req, '/follow');
		console.log(result.data);
		return res.json(result.data);
	} catch (err){
		console.error(err);
		next(err);
	}
})

module.exports = router;
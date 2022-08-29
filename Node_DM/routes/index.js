const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'https://node-all-in-one-api.run.goorm.io/v1';
axios.defaults.headers.origin = 'https://node-all-in-one-dm.run.goorm.io';

router.get('/', (req, res) => {
	return res.render('login');
})

const request = async (req, api, data) => {
	try{
		if (!req.session.jwt) {
			const tokenResult = await axios.post(`${URL}/token`, {
				clientSecret: process.env.CLIENT_SECRET,
			});
			req.session.jwt = tokenResult.data.token;
		}
		if(!data.id){
			console.log('id == undefined');
			return await axios.get(`${URL}${api}`, {
				headers: { authorization: req.session.jwt },
			});
		}
		if(data.id == 1){
			console.log(data.email, data.password);
			return await axios.get(`${URL}${api}`, {
				email: data.email,
				password: data.password,
				headers: { authorization: req.session.jwt },
			});
		}
		console.log('id == 2');
		return await axios.get(`${URL}${api}`, {
			userId: data.userId,
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
});

router.get('/follow', async (req, res) => {
	try{
		const data = {id: 2, userId: req.user.id};
		const result = await request(req, '/follow', data);
		console.log(result.data);
		return res.json(result.data);
	} catch (err){
		console.error(err);
		next(err);
	}
});

router.post('/login', async (req, res) => {
	try{
		const { email, password } = req.body;
		const data = {id: 1, email, password};
		const result = await request(req, '/login', data);
		console.log(result.data);
		return res.render('main');
	} catch(err) {
		console.error(err);
		next(err);
	}
})
module.exports = router;
const express = require('express');
const { createUser, handleLogin, getUsers } = require('../controllers/userController');
const delay = require('../middleware/delay');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

// Ap dung delay cho tat ca API ben duoi
routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
	return res.status(200).json('hello world thang cho');
});

routerAPI.get('/users', getUsers);

routerAPI.post('/login', handleLogin);
routerAPI.post('/register', createUser);

module.exports = routerAPI; //export default

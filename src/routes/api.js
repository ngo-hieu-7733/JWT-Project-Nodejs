const express = require('express');
const { createUser, handleLogin, getUsers } = require('../controllers/userController');

const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')

// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

routerAPI.get('/', (req, res) => {
	return res.status(200).json('hello world thang cho');
});

routerAPI.get('/users', getUsers);

routerAPI.post('/login', handleLogin);
routerAPI.post('/register', createUser);

module.exports = routerAPI; //export default

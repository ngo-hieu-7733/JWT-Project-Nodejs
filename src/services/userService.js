require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createUserService = async (name, email, password) => {
	try {
		// check email is existed
		const isExistedEmail = await User.findOne({ email });
		if (isExistedEmail) {
			console.log('Email is existed!!!');
			return null;
		}
		// hash user's password
		const hashPassword = await bcrypt.hash(password, saltRounds);

		// save user to db
		let result = await User.create({
			name: name,
			email: email,
			password: hashPassword,
			role: 'admin',
		});
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const loginService = async (email, password) => {
	try {
		// hash user's password
		const user = await User.findOne({ email });

		if (user) {
			const isMatchPassword = await bcrypt.compare(password, user.password);
			if (isMatchPassword) {
				// create access token
				const payload = {
					email: user.email,
					name: user.name,
				};
				const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXP,
				});
				return {
					code: 201,
					token: accessToken,
					user: {
						email: user.email,
						name: user.name,
					},
				};
			}
			return {
				code: 401,
				message: 'email / password khong hop le',
			};
		} else {
			return {
				code: 401,
				message: 'email / password khong hop le',
			};
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getUsersService = async () => {
	try {
		// hash user's password
		const result = await User.find({});
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {
	createUserService,
	loginService,
	getUsersService,
};

const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
	try {
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
			const res = await bcrypt.compare(password, user.password);
			if (res) {
				return {
					code: 201,
					message: 'dang nhap thanh cong',
					token: 'access-token',
				};
			}
			return {
				code: 2,
				message: 'email / password khong hop le',
			};
		} else {
			return {
				code: 1,
				message: 'email / password khong hop le',
			};
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

module.exports = {
	createUserService,
	loginService,
};

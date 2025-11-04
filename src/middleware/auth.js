require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const white_list = ['/', '/register', '/login'];
	if (white_list.find((item) => '/v1/api' + item === req.originalUrl)) {
		next();
	} else if (req?.headers?.authorization?.split(' ')?.[1]) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			//verify
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded);
			next();
		} catch (error) {
			return res.status(401).json({
				message: 'access_token khong hop le/ het han',
			});
		}
	} else {
		// return exception
		return res.status(401).json({
			message: 'acess_token bị thiếu/hết hạn',
		});
	}
};

module.exports = auth;

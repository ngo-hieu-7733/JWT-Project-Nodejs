const delay = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];
		console.log('>>> CHECK TOKEN: ', token);
		next();
	} else {
		return 'sai roi thng cho';
	}
};

module.exports = delay;

const jsonWebToken = require('jsonwebtoken');
const { jwt } = require('../config');

function verifyToken(req, res, next) {
	const token = req.headers['conpass-token'];
	if (!token)
		return res.status(403).send({ auth: false, message: 'No token provided.' });

	jsonWebToken.verify(token, jwt.secret, function(err, decoded) {
		if (err)
			return res.status(401).send({
				auth: false,
				message: 'Problemas na autenticação do seu token.'
			});
		req.userId = decoded.id;
		next();
	});
}

module.exports = verifyToken;

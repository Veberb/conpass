const { Router } = require('express');
const router = Router({ mergeParams: true });
const userManager = require('./userManager');
const jsonWebToken = require('jsonwebtoken');
const { jwt } = require('../../config');
const { actionType, objectType } = require('../track/trackModel');
const track = require('../../middleware/track');

module.exports = app => {
	app.use('/api/users', router);
};

router.post(
	'/',
	track(actionType.CREATE, objectType.USER),
	(req, res, next) => {
		userManager
			.create(req.body)
			.then(result => res.json(result))
			.catch(next);
	}
);

router.post('/login', async (req, res, next) => {
	try {
		const user = await userManager.login(req.body);

		const token = jsonWebToken.sign({ id: user.id }, jwt.secret, {
			expiresIn: jwt.expiresIn
		});
		res.send({ auth: true, token: token });
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	track(actionType.EDIT, objectType.USER),
	(req, res, next) => {
		userManager
			.update({ ...req.body, id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

router.delete(
	'/:id',
	track(actionType.REMOVE, objectType.USER),
	(req, res, next) => {
		userManager
			.delete({ id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

const { Router } = require('express');
const router = Router({ mergeParams: true });
const roleManager = require('./roleManager');
const { actionType, objectType } = require('../track/trackModel');
const track = require('../../middleware/track');

module.exports = app => {
	app.use('/api/roles', router);
};

router.post(
	'/',
	track(actionType.CREATE, objectType.ROLE),
	(req, res, next) => {
		roleManager
			.create(req.body)
			.then(result => res.json(result))
			.catch(next);
	}
);

router.put(
	'/:id',
	track(actionType.UPDATE, objectType.ROLE),
	(req, res, next) => {
		roleManager
			.update({ ...req.body, id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

router.delete(
	'/:id',
	track(actionType.REMOVE, objectType.ROLE),
	(req, res, next) => {
		roleManager
			.delete({ id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

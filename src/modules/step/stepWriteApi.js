const { Router } = require('express');
const router = Router({ mergeParams: true });
const stepManager = require('./stepManager');
const { actionType, objectType } = require('../track/trackModel');
const track = require('../../middleware/track');

module.exports = app => {
	app.use('/api/steps', router);
};

router.post(
	'/',
	track(actionType.CREATE, objectType.STEP),
	(req, res, next) => {
		stepManager
			.create(req.body)
			.then(result => res.json(result))
			.catch(next);
	}
);

router.put(
	'/:id',
	track(actionType.EDIT, objectType.STEP),
	(req, res, next) => {
		stepManager
			.update({ ...req.body, id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

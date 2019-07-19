const { Router } = require('express');
const router = Router({ mergeParams: true });
const flowManager = require('./flowManager');
const { actionType, objectType } = require('../track/trackModel');
const track = require('../../middleware/track');

module.exports = app => {
	app.use('/api/flows', router);
};

router.post(
	'/',
	track(actionType.CREATE, objectType.FLOW),
	(req, res, next) => {
		flowManager
			.create(req.body)
			.then(result => res.json(result))
			.catch(next);
	}
);

router.put(
	'/:id',
	track(actionType.EDIT, objectType.FLOW),
	(req, res, next) => {
		flowManager
			.update({ ...req.body, id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

router.delete(
	'/:id',
	track(actionType.REMOVE, objectType.FLOW),
	(req, res, next) => {
		flowManager
			.delete({ id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

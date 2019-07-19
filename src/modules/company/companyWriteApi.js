const { Router } = require('express');
const router = Router({ mergeParams: true });
const companyManager = require('./companyManager');
const { actionType, objectType } = require('../track/trackModel');
const track = require('../../middleware/track');

module.exports = app => {
	app.use('/api/companies', router);
};

router.post(
	'/',
	track(actionType.CREATE, objectType.COMPANY),
	(req, res, next) => {
		companyManager
			.create(req.body)
			.then(result => res.json(result))
			.catch(next);
	}
);

router.put(
	'/:id',
	track(actionType.EDIT, objectType.COMPANY),
	(req, res, next) => {
		companyManager
			.update({ ...req.body, id: req.params.id })
			.then(result => res.json(result))
			.catch(next);
	}
);

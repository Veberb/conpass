const { Router } = require('express');
const router = Router({ mergeParams: true });
const stepManager = require('./stepManager');

module.exports = app => {
	app.use('/api/steps', router);
};

router.post('/', (req, res, next) => {
	stepManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

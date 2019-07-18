const { Router } = require('express');
const router = Router({ mergeParams: true });
const stepManager = require('./stepManager');

module.exports = app => {
	app.use('/api/steps', router);
};

router.get('/', (req, res, next) => {
	stepManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	stepManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

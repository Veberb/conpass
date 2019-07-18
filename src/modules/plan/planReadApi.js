const { Router } = require('express');
const router = Router({ mergeParams: true });
const planManager = require('./planManager');

module.exports = app => {
	app.use('/api/plans', router);
};

router.get('/', (req, res, next) => {
	planManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	planManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

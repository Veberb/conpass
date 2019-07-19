const { Router } = require('express');
const router = Router({ mergeParams: true });
const activityManager = require('./activityManager');

module.exports = app => {
	app.use('/api/activities', router);
};

router.get('/', (req, res, next) => {
	activityManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	activityManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

const { Router } = require('express');
const router = Router({ mergeParams: true });
const activityManager = require('./activityManager');

module.exports = app => {
	app.use('/api/activities', router);
};

router.post('/', (req, res, next) => {
	activityManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	activityManager
		.update({ ...req.body, id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

const { Router } = require('express');
const router = Router({ mergeParams: true });
const subscriptionManager = require('./subscriptionManager');

module.exports = app => {
	app.use('/api/subscriptions', router);
};

router.get('/', (req, res, next) => {
	subscriptionManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	subscriptionManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

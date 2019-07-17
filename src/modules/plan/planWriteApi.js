const { Router } = require('express');
const router = Router({ mergeParams: true });
const planManager = require('./planManager');

module.exports = app => {
	app.use('/api/plans', router);
};

router.post('/', (req, res, next) => {
	planManager
		.create({ plans: req.body })
		.then(result => res.json(result))
		.catch(next);
});

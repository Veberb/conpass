const { Router } = require('express');
const router = Router({ mergeParams: true });
const userManager = require('./userManager');

module.exports = app => {
	app.use('/api/users', router);
};

router.get('/', (req, res, next) => {
	userManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	userManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

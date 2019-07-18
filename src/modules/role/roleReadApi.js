const { Router } = require('express');
const router = Router({ mergeParams: true });
const roleManager = require('./roleManager');

module.exports = app => {
	app.use('/api/roles', router);
};

router.get('/', (req, res, next) => {
	roleManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	roleManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

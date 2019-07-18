const { Router } = require('express');
const router = Router({ mergeParams: true });
const companyManager = require('./companyManager');

module.exports = app => {
	app.use('/api/companies', router);
};

router.get('/', (req, res, next) => {
	companyManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	companyManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

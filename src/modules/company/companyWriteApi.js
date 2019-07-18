const { Router } = require('express');
const router = Router({ mergeParams: true });
const companyManager = require('./companyManager');

module.exports = app => {
	app.use('/api/companies', router);
};

router.post('/', (req, res, next) => {
	companyManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

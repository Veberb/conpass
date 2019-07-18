const { Router } = require('express');
const router = Router({ mergeParams: true });
const flowManager = require('./flowManager');

module.exports = app => {
	app.use('/api/flows', router);
};

router.get('/', (req, res, next) => {
	flowManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	flowManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

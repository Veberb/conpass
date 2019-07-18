const { Router } = require('express');
const router = Router({ mergeParams: true });
const flowManager = require('./flowManager');

module.exports = app => {
	app.use('/api/flows', router);
};

router.post('/', (req, res, next) => {
	flowManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	flowManager
		.update({ ...req.body, id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	flowManager
		.delete({ id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

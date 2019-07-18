const { Router } = require('express');
const router = Router({ mergeParams: true });
const userManager = require('./userManager');

module.exports = app => {
	app.use('/api/users', router);
};

router.post('/', (req, res, next) => {
	userManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	userManager
		.update({ ...req.body, id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	userManager
		.delete({ id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

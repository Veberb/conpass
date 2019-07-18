const { Router } = require('express');
const router = Router({ mergeParams: true });
const roleManager = require('./roleManager');

module.exports = app => {
	app.use('/api/roles', router);
};

router.post('/', (req, res, next) => {
	roleManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	roleManager
		.update({ ...req.body, id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	roleManager
		.delete({ id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

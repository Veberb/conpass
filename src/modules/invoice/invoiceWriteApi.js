const { Router } = require('express');
const router = Router({ mergeParams: true });
const invoiceManager = require('./invoiceManager');

module.exports = app => {
	app.use('/api/invoices', router);
};

router.post('/', (req, res, next) => {
	invoiceManager
		.create(req.body)
		.then(result => res.json(result))
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	invoiceManager
		.update({ ...req.body, id: req.params.id })
		.then(result => res.json(result))
		.catch(next);
});

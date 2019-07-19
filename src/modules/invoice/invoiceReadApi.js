const { Router } = require('express');
const router = Router({ mergeParams: true });
const invoiceManager = require('./invoiceManager');

module.exports = app => {
	app.use('/api/invoices', router);
};

router.get('/', (req, res, next) => {
	invoiceManager
		.list(req.query)
		.then(result => res.json(result))
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	invoiceManager
		.get(req.params)
		.then(result => res.json(result))
		.catch(next);
});

const { Router } = require('express');
const router = Router({ mergeParams: true });
const subscriptionManager = require('./subscriptionManager');

module.exports = app => {
    app.use('/api/subscriptions', router);
};

router.post('/', (req, res, next) => {
    subscriptionManager
        .create(req.body)
        .then(result => res.json(result))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    subscriptionManager
        .update({ ...req.body, id: req.params.id })
        .then(result => res.json(result))
        .catch(next);
});

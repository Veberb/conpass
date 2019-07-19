const { Router } = require('express');
const router = Router({ mergeParams: true });
const trackManager = require('./trackManager');

module.exports = app => {
    app.use('/api/trackers', router);
};

router.get('/', (req, res, next) => {
    trackManager
        .list(req.query)
        .then(result => res.json(result))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    trackManager
        .get(req.params)
        .then(result => res.json(result))
        .catch(next);
});

const { Router } = require('express');
const router = Router({ mergeParams: true });
const viewerManager = require('./viewerManager');

module.exports = app => {
    app.use('/api/viewers', router);
};

router.get('/', (req, res, next) => {
    viewerManager
        .list(req.query)
        .then(result => res.json(result))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    viewerManager
        .get(req.params)
        .then(result => res.json(result))
        .catch(next);
});

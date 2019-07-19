const { Router } = require('express');
const router = Router({ mergeParams: true });
const viewerManager = require('./viewerManager');

module.exports = app => {
    app.use('/api/viewers', router);
};

router.post('/', (req, res, next) => {
    viewerManager
        .create(req.body)
        .then(result => res.json(result))
        .catch(next);
});

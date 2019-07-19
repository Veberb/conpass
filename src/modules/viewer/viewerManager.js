const Boom = require('boom');
const ViewerModel = require('./viewerModel');
const uuidv1 = require('uuid');

exports.create = async ({ client, customFields }) => {
    const newViewer = { customFields }
    if (client) {
        newViewer.client = client;
    } else {
        newViewer.uuid = uuidv1()
    }

    const viewer = new ViewerModel(newViewer);
    return viewer.save();
};

exports.get = async ({ id }) => {
    const viewer = await ViewerModel.findById(id);
    if (!viewer) throw Boom.notFound('Viewer não encontrado');

    return viewer;
};

exports.list = async ({ page = 1, limit = 10, order = '-createdAt' }) => {
    const query = {};

    const [items, total] = await Promise.all([
        ViewerModel.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(order),
        ,
        ViewerModel.countDocuments(query)
    ]);
    return { total, items };
};

const Boom = require('boom');
const { TrackModel } = require('./trackModel');

exports.get = async ({ id }) => {
    const track = await TrackModel.findById(id);
    if (!track) throw Boom.notFound('Track não encontrado');

    return track;
};

exports.list = async ({
    actionType,
    objectType,
    page = 1,
    limit = 10,
    order = '-createdAt'
}) => {
    const query = {};

    if (actionType) query.actionType = { $regex: actionType, $options: 'i' };
    if (objectType) query.objectType = { $regex: objectType, $options: 'i' };
    const [items, total] = await Promise.all([
        TrackModel.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(order),
        TrackModel.countDocuments(query)
    ]);
    return { total, items };
};
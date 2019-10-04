const Boom = require('boom');
const { ActivityModel, activityType } = require('./activityModel');
const ObjectID = require('mongodb').ObjectID;

exports.create = async ({ type, flow, step, owner }) => {
  if (!flow && !step)
    throw Boom.badRequest('É necessário informar id do Step ou do Flow');

  const activity = new ActivityModel({ type, flow, step, owner });
  return activity.save();
};

exports.update = async ({ id, type, step, owner }) => {
  const $set = {};
  if (!ObjectID.isValid(step))
    throw Boom.badData('Step não é um objectId válido');
  if (!ObjectID.isValid(owner))
    throw Boom.badData('Owner não é um objectId válido');
  if (type && activityType.includes(type)) $set.type = type;
  if (step) {
    $set.step = step;
  }
  if (owner) {
    $set.owner = owner;
  }

  return ActivityModel.findByIdAndUpdate(id, { $set }, { new: true });
};

exports.get = async ({ id }) => {
  const activity = await ActivityModel.findById(id);
  if (!activity) throw Boom.notFound('Activity não encontrado');

  return activity;
};

exports.list = async ({
  flow,
  owner,
  step,
  page = 1,
  limit = 10,
  order = '-createdAt'
}) => {
  const query = {};

  if (flow) query.flow = flow;
  if (owner) query.owner = owner;
  if (step) query.step = step;
  const [items, total] = await Promise.all([
    ActivityModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(order),
    ActivityModel.countDocuments(query)
  ]);
  return { total, items };
};

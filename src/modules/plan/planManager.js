const Boom = require('boom');
const PlanModel = require('./planModel');

exports.create = async ({ plans }) => {
	const existPlan = await PlanModel.find();
	if (existPlan.length > 0)
		throw Boom.badRequest('Os planos já foram cadastrados');

	return PlanModel.insertMany(plans);
};

exports.get = async ({ id }) => {
	const plan = await PlanModel.findById(id);
	if (!plan) throw Boom.notFound('Plano não encontrado');

	return plan;
};

exports.list = async ({ name, page = 1, limit = 10, order = '-createdAt' }) => {
	const query = {};

	if (name) query.name = { $regex: name, $options: 'i' };
	const [items, total] = await Promise.all([
		PlanModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		,
		PlanModel.countDocuments(query)
	]);
	return { total, items };
};

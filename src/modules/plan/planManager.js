const Boom = require('boom');
const PlanModel = require('./planModel');

exports.create = async ({ plans }) => {
	const existPlan = await PlanModel.find();
	if (existPlan.length > 0)
		throw Boom.badRequest('Os planos já foram cadastrados');

	return PlanModel.insertMany(plans);
};

exports.get = async ({ id }) => {
	return PlanModel.findById(id);
};

exports.list = async ({
	searchCriteria,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (searchCriteria) query.name = { $regex: searchCriteria, $options: 'i' };
	const [items, total] = await Promise.all([
		PlanModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit),
		PlanModel.countDocuments()
	]);
	return { total, items };
};

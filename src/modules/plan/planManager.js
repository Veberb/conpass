const Boom = require('boom');
const PlanModel = require('./planModel');

exports.create = async ({ plans }) => {
	const existPlan = await PlanModel.find();
	if (existPlan.length > 0)
		throw Boom.badRequest('Os planos já foram cadastrados');

	return PlanModel.insertMany(plans);
};

const Boom = require('boom');
const CompanyModel = require('./companyModel');
const subscriptionManager = require('../subscription/subscriptionManager');

exports.create = async ({ name, description, owner, planId }) => {
	if (!planId)
		throw Boom.badRequest(
			'É necessário informar o id do plano para cadastrar a empresa'
		);

	const company = new CompanyModel({ name, description, owner });
	await company.save();

	subscriptionManager.create({ planId, company: company._id });

	return company;
};

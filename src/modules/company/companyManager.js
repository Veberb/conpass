const Boom = require('boom');
const CompanyModel = require('./companyModel');
const ObjectID = require('mongodb').ObjectID;
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

exports.update = async ({ id, name, description, owner }) => {
	const $set = {};

	if (name) $set.name = name;
	if (description) $set.description = description;
	if (owner) {
		if (!ObjectID.isValid(owner))
			throw Boom.badData('Ownder não é um objectId');
		$set.owner = owner;
	}

	return CompanyModel.findByIdAndUpdate(id, { $set }, { new: true });
};

exports.get = async ({ id }) => {
	const company = await CompanyModel.findById(id);
	if (!company) throw Boom.notFound('Company não encontrada');

	return company;
};

exports.list = async ({
	name,
	owner,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (name) query.name = { $regex: name, $options: 'i' };
	if (owner) query.owner = owner;
	const [items, total] = await Promise.all([
		CompanyModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		CompanyModel.countDocuments(query)
	]);
	return { total, items };
};

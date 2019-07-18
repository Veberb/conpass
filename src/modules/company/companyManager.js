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
	return CompanyModel.findById(id);
};

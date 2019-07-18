const Boom = require('boom');
const FlowModel = require('./flowModel');
const ObjectID = require('mongodb').ObjectID;

exports.create = async ({ name, description, company, startStep }) => {
	if (!company || !ObjectID.isValid(company))
		throw Boom.badRequest('É necessário informar id válido da empresa');

	if (startStep && !ObjectID.isValid(startStep))
		throw Boom.badRequest('É necessário informar id válido da primeiro passo?');

	const flow = new FlowModel({ name, description, company, startStep });
	return flow.save();
};

exports.update = async ({ id, name, description, company, startStep }) => {
	const $set = {};

	if (name) $set.name = name;
	if (description) $set.description = description;
	if (startStep) {
		if (!ObjectID.isValid(startStep))
			throw Boom.badData('StartStep não é um objectId válido');
		$set.startStep = startStep;
	}

	if (company) {
		if (!ObjectID.isValid(company))
			throw Boom.badData('Company não é um objectId válido');
		$set.company = company;
	}

	return FlowModel.findByIdAndUpdate(id, { $set }, { new: true });
};

exports.get = async ({ id }) => {
	return FlowModel.findById(id);
};

exports.delete = async ({ id }) => {
	return FlowModel.findByIdAndDelete(id);
};

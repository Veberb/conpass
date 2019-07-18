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
	const flow = await FlowModel.findById(id);
	if (!flow) throw Boom.notFound('Flow não encontrado');

	return flow;
};

exports.delete = async ({ id }) => {
	return FlowModel.findByIdAndDelete(id);
};

exports.list = async ({
	name,
	company,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (name) query.name = { $regex: name, $options: 'i' };
	if (company) query.company = company;
	const [items, total] = await Promise.all([
		FlowModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		FlowModel.countDocuments(query)
	]);
	return { total, items };
};

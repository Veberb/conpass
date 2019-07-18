const Boom = require('boom');
const { StepModel, stepTypes } = require('./stepModel');
const ObjectID = require('mongodb').ObjectID;

exports.create = async ({ type, innerText, company, flow }) => {
	if (!company || !ObjectID.isValid(company))
		throw Boom.badRequest('É necessário informar id válido da Empresa');

	if (flow && !ObjectID.isValid(flow))
		throw Boom.badRequest('É necessário informar id de Flow válido');

	const step = new StepModel({ type, innerText, company, flow });
	await step.save();

	//Verificar pq não está atualizando o nextStep
	const lastStep = await StepModel.findOne({
		_id: { $ne: step._id },
		nextStep: { $eq: null }
	}).lean();

	if (lastStep) {
		StepModel.findByIdAndUpdate(
			{ id: lastStep._id },
			{
				$set: { nextStep: step._id }
			}
		);
	}

	return step;
};

exports.update = async ({ id, type, innerText, company }) => {
	const $set = {};

	if (type && stepTypes.includes(type)) $set.type = type;
	if (innerText) $set.innerText = innerText;

	if (company) {
		if (!ObjectID.isValid(company))
			throw Boom.badData('Company não é um objectId válido');
		$set.company = company;
	}

	return StepModel.findByIdAndUpdate(id, { $set }, { new: true });
};

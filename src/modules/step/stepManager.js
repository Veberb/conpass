const Boom = require('boom');
const StepModel = require('./stepModel');
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
		StepModel.findByIdAndUpdate(lastStep._id, {
			$set: { nextStep: step._id }
		});
	}

	return step;
};

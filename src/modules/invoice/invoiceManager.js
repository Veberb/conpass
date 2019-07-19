const Boom = require('boom');
const InvoiceModel = require('./invoiceModel');
const ObjectID = require('mongodb').ObjectID;

exports.create = async ({ subscription, paidDate }) => {
	if (!subscription || !ObjectID.isValid(subscription))
		throw Boom.badRequest('É necessário informar id válido da subscription');

	const invoice = new InvoiceModel({ subscription, paidDate });
	return invoice.save();
};

exports.update = async ({ id, subscription, paidDate }) => {
	const $set = {};

	if (paidDate) $set.paidDate = paidDate;
	if (subscription) {
		if (!ObjectID.isValid(subscription))
			throw Boom.badData('Subscription não é um objectId válido');
		$set.subscription = subscription;
	}

	return InvoiceModel.findByIdAndUpdate(id, { $set }, { new: true });
};

exports.get = async ({ id }) => {
	const invoice = await InvoiceModel.findById(id);
	if (!invoice) throw Boom.notFound('Invoice não encontrado');

	return invoice;
};

exports.list = async ({
	subscription,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (subscription) query.subscription = subscription;
	const [items, total] = await Promise.all([
		InvoiceModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		InvoiceModel.countDocuments(query)
	]);
	return { total, items };
};

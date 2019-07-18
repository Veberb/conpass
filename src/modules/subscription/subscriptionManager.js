const Boom = require('boom');
const SubscriptionModal = require('./subscriptionModel');

exports.create = async ({ planId, company }) => {
	const subscription = new SubscriptionModal({
		company,
		plan: planId
	});
	return subscription.save();
};

exports.get = async ({ id }) => {
	const subscription = await SubscriptionModal.findById(id);
	if (!subscription) throw Boom.notFound('Subscription não encontrada');

	return subscription;
};

exports.list = async ({
	flow,
	company,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (flow) query.flow = flow;
	if (company) query.company = company;
	const [items, total] = await Promise.all([
		SubscriptionModal.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		SubscriptionModal.countDocuments(query)
	]);
	return { total, items };
};

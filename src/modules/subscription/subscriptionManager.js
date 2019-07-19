const Boom = require('boom');
const { SubscriptionModal, subscriptionStatus } = require('./subscriptionModel');

exports.create = async ({ planId, company }) => {
	const subscription = new SubscriptionModal({
		company,
		plan: planId
	});
	return subscription.save();
};


exports.update = async ({ id, status, dueDate }) => {
	const $set = {};

	if (status && subscriptionStatus.includes(status)) $set.status = status;
	if (dueDate) $set.dueDate = dueDate;

	return SubscriptionModal.findByIdAndUpdate(id, { $set }, { new: true });
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

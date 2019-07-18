const Boom = require('boom');
const SubscriptionModal = require('./subscriptionModel');

exports.create = async ({ planId, company }) => {
	const subscription = new SubscriptionModal({
		company,
		plan: planId
	});
	return subscription.save();
};

const mongoose = require('mongoose');
const Enum = require('../../util/enum/Enum');

exports.subscriptionStatus = new Enum([
	'TRIAL',
	'ACTIVE',
	'PAST_DUE',
	'BLOCKED'
]);

const subscriptionSchema = new mongoose.Schema(
	{
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Company'
		},
		plan: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: 'Plan'
		},
		status: {
			type: String,
			enum: this.subscriptionStatus.list()
		},
		enabled: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Subscription', subscriptionSchema);

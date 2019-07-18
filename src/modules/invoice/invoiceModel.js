const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
	{
		subscription: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Subscription'
		},
		value: {
			type: Boolean,
			default: true
		},
		dueDate: {
			type: Number
		},
		paidDate: {
			type: Number
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

module.exports = mongoose.model('Invoice', invoiceSchema);

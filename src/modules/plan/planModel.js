const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		value: { type: Number, required: true },
		enabled: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Plan', planSchema);

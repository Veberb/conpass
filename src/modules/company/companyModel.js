const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Company', companySchema);

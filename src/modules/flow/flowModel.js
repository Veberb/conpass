const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Company'
		},
		startStep: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: 'Step'
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

module.exports = mongoose.model('Flow', flowSchema);

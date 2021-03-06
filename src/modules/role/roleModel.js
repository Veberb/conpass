const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Company'
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

roleSchema.index({ name: 1, company: 1 }, { unique: true });

module.exports = mongoose.model('Role', roleSchema);

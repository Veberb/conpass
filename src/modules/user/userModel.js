const mongoose = require('mongoose');
//adicionar roles
const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Company'
		},
		enabled: {
			type: Boolean,
			default: true
		},
		role: [mongoose.Schema.Types.ObjectId]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);

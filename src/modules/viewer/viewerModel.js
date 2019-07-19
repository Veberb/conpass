const mongoose = require('mongoose');
const uuidv1 = require('uuid');

const viewerSchema = new mongoose.Schema(
	{
		client: { type: String, unique: true },
		uuid: { type: String },
		customFields: [String],
		enabled: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Viewer', viewerSchema);

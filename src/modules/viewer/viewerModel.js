const mongoose = require('mongoose');
const uuidv1 = require('uuid');

const viewerSchema = new mongoose.Schema(
	{
		client: { type: String, required: true },
		uuid: { type: String, required: true },
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

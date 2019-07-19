const mongoose = require('mongoose');
const Enum = require('../../util/enum/Enum');

exports.actionType = new Enum(['CREATE', 'EDIT', 'REMOVE']);
exports.objectType = new Enum(['COMPANY', 'ROLE', 'FLOW', 'STEP', 'USER']);

const trackSchema = new mongoose.Schema(
	{
		//owner adicionar
		action: {
			type: String,
			enum: this.actionType.list(),
			required: true
		},
		object: {
			type: String,
			enum: this.objectType.list(),
			required: true
		}
	},
	{
		timestamps: true
	}
);

exports.TrackModel = mongoose.model('Track', trackSchema);

const mongoose = require('mongoose');
const Enum = require('../../util/enum/Enum');

exports.activityType = new Enum([
	'START_FLOW',
	'END_FLOW',
	'CANCEL_FLOW',
	'START_STEP',
	'END_STEP',
	'CANCEL_STEP'
]);

const activitySchema = new mongoose.Schema(
	{
		//owner adicionar
		flow: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: 'Flow'
		},
		step: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: 'Step'
		},
		type: {
			type: String,
			enum: this.activityType.list(),
			required: true
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

module.exports = mongoose.model('Activity', activitySchema);

const mongoose = require('mongoose');
const Enum = require('../../util/enum/Enum');

exports.stepTypes = new Enum([
	'POPOVER',
	'MODAL',
	'HOTSPOT',
	'VIDEO',
	'NOTIFICATION'
]);

const stepSchema = new mongoose.Schema(
	{
		innerText: { type: String, required: true },
		company: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Company'
		},
		flow: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			required: true,
			ref: 'Flow'
		},
		nextStep: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			ref: 'Step'
		},
		type: {
			type: String,
			enum: this.stepTypes.list(),
			default: this.stepTypes.POPOVER
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

exports.StepModel = mongoose.model('Step', stepSchema);

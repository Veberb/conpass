const mongoose = require('mongoose');

//Não vou deixar owner como required pois não seria possivel iniciar o sistema
const companySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		owner: {
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

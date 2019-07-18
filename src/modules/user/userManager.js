const Boom = require('boom');
const UserModel = require('./userModel');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = async ({ name, email, company, password }) => {
	const hash = await bcrypt.hash(password, saltRounds);

	if (!company || !ObjectID.isValid(company))
		throw Boom.badRequest('É necessário informar id válido da empresa');

	const user = new UserModel({ name, email, company, password: hash });
	return user.save();
};

exports.update = async ({ id, name, email, company, password }) => {
	const $set = {};

	if (name) $set.name = name;
	if (email) $set.email = email;
	if (password) {
		const hash = await bcrypt.hash(password, saltRounds);
		$set.password = hash;
	}
	if (company) {
		if (!ObjectID.isValid(company))
			throw Boom.badData('Owner não é um objectId');
		$set.company = company;
	}

	return UserModel.findByIdAndUpdate(id, { $set }, { new: true });
};

exports.get = async ({ id }) => {
	return UserModel.findById(id);
};

exports.delete = async ({ id }) => {
	const user = await UserModel.findById(id).populate('company');
	// console.log(typeof user._id); veerificar pq ele retorna um object
	if (
		user &&
		user.company &&
		user._id.toString() === user.company.owner.toString()
	)
		throw Boom.badRequest(
			`Não foi possível deletar, o ${user.name} é dono da empresa ${
				user.company.name
			}`
		);

	return UserModel.findOneAndDelete(id);
};

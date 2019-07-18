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
	const user = await UserModel.findById(id);
	if (!user) throw Boom.notFound('User não encontrado');

	return user;
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

exports.list = async ({
	name,
	company,
	email,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (name) query.name = { $regex: name, $options: 'i' };
	if (email) query.email = { $regex: email, $options: 'i' };
	if (company) query.company = company;
	const [items, total] = await Promise.all([
		UserModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		UserModel.countDocuments(query)
	]);
	return { total, items };
};

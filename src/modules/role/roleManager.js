const Boom = require('boom');
const RoleModel = require('./roleModel');
const ObjectID = require('mongodb').ObjectID;

exports.create = async ({ name, description, company }) => {
	if (!company || !ObjectID.isValid(company))
		throw Boom.badRequest('É necessário informar id válido da empresa');

	const role = new RoleModel({ name, description, company });
	return role.save();
};

exports.update = async ({ id, name, description, company }) => {
	const $set = {};

	if (name) $set.name = name;
	if (description) $set.description = description;

	if (company) {
		if (!ObjectID.isValid(company))
			throw Boom.badData('Company não é um objectId válido');
		$set.company = company;
	}

	return RoleModel.findByIdAndUpdate(id, { $set }, { new: true });
};

exports.get = async ({ id }) => {
	const role = await RoleModel.findById(id);
	if (!role) throw Boom.notFound('Role não encontrada');

	return role;
};

exports.delete = async ({ id }) => {
	return RoleModel.findByIdAndDelete(id);
};

exports.list = async ({
	name,
	company,
	page = 1,
	limit = 10,
	order = '-createdAt'
}) => {
	const query = {};

	if (name) query.name = { $regex: name, $options: 'i' };
	if (company) query.company = company;
	const [items, total] = await Promise.all([
		RoleModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(order),
		RoleModel.countDocuments(query)
	]);
	return { total, items };
};

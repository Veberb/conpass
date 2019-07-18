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
	return RoleModel.findById(id);
};

exports.delete = async ({ id }) => {
	return RoleModel.findByIdAndDelete(id);
};

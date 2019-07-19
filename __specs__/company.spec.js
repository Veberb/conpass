const MongoMemory = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const { expect } = require('chai');
const PlanModel = require('../src/modules/plan/planModel');
const SubscriptionsManager = require('../src/modules/subscription/subscriptionManager');
const companyManager = require('../src/modules/company/companyManager');

let mongod;
let plan
describe('Company tests', () => {
	before(async () => {
		mongod = new MongoMemory();
		
		const conn =  await mongoose.connect(await mongod.getConnectionString(), {
			useNewUrlParser: true
		});

		plan = new PlanModel({name: 'Basic', value: 250});
		await plan.save();

		return conn
		
	});

	it('Cadastro da company', async () => {

		const company = await companyManager.create({name: "Empresa", description: "Fabrica de software", planId: plan._id})
		expect(company).to.have.property('_id');
		
		return true;
	});

	it('Cadastro duplicado', async () => {
		try {
			await companyManager.create({name: "Empresa", description: "Fabrica de software", planId: plan._id})
		} catch (error) {
			expect(error.errmsg).to.contains('duplicate key')
		}
		return true;
	});

	it('Cadastro sem o planoId', async () => {
		try {
			await companyManager.create({name: "Empresa 2", description: "Fabrica de software"})
		} catch (error) {
			expect(error.output.payload.error).to.contains('Bad Request')
		}
		return true;
	});

	it('Subscription criado com company ', async () => {
		const subscription = await SubscriptionsManager.list({});
		expect(subscription.total).to.be.equal(1)
		return true;
	});

	after(() => {
		mongod.stop()
	})


});

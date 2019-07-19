const MongoMemory = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const { expect } = require('chai');
const planManager = require('../../src/modules/plan/planManager');

let mongod;

describe('Plans tests', () => {
	before(async () => {
		mongod = new MongoMemory();
		return mongoose.connect(await mongod.getConnectionString(), {
			useNewUrlParser: true
		});
	});

	it('Cadastro de planos', async () => {
		const plans = await planManager.create({
			plans: [
				{
					name: 'Basic',
					value: 250
				},
				{
					name: 'Pro',
					value: 500
				},
				{
					name: 'Enterprise',
					value: 750
				}
			]
		});
		expect(plans).to.have.length(3);
		return true;
	});

	it('Erro de planos já cadastrados', async () => {
		try {
			const plans = await planManager.create({
				plans: [
					{
						name: 'Basic',
						value: 250
					},
					{
						name: 'Pro',
						value: 500
					},
					{
						name: 'Enterprise',
						value: 750
					}
				]
			});
		} catch (err) {
			expect(err.message).to.contains('Os planos já foram cadastrados');
		}

		return true;
	});

	it('Paginação dos planos com 2 itens', async () => {
		const plans = await planManager.list({ page: 1, limit: 2 });
		expect(plans.items).to.have.lengthOf(2);
		return true;
	});
});

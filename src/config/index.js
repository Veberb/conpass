const path = require('path');
const _ = require('lodash');

const env = process.env.NODE_ENV;
const dev = env === 'development';
const staging = env === 'staging';
const production = env === 'production';

const DEFAULT_ENV_CONFIG = {
	// database
	db: process.env.MONGO_PATH || 'mongodb://localhost:27017/conpass',

	// app serving on
	host: process.env.HOST || '127.0.0.1',
	port: process.env.PORT || 3000,

	// env
	env,
	dev,
	staging,
	production,

	// app path
	path: path.normalize(`${__dirname}/..`)
};

module.exports = _.merge({}, DEFAULT_ENV_CONFIG);

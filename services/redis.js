const TelegrafRedis = require('telegraf-session-redis');
require('dotenv').config();

// Initialize redis session
const redis = new TelegrafRedis({
	store: {
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || 6380,
	},
});

module.exports = redis;

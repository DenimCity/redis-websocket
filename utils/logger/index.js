import { configure, getLogger } from 'log4js';

configure({
	appenders: {
		dashboard: {
			type: 'console'
		}
	},
	categories: {
		default: {
			appenders: [ 'dashboard' ],
			level: process.env.LOG_LEVEL || 'trace'
		}
	}
});

const logger = getLogger('MESSAGE');

export default logger;

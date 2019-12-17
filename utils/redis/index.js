const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
	createConnection: () => {
		return new Promise((resolve, reject) => {
			const client = redis.createClient();
			client.on('connect', () => {
				resolve(client);
			});
			client.on('error', () => {
				reject('Error: Failed to connect');
			});
		});
	},
	redisPrep: (data) => {
		return JSON.stringify(data);
	},
	redisUnPrep: (data) => {
		return JSON.parse(data);
	},
	storeMessage: async (query, data) => {
		let basketItem = JSON.stringify(data);

		try {
			const response = await redisClient.lpush(query, basketItem);
			console.log('TCL: response', response);
			return response;
		} catch (error) {
			console.log('TCL: error', error.message);
			return false;
		}
	},
	retreiveData: async (query) =>
		new Promise((resolve, reject) => {
			if (!query) {
				throw Error('Must Provide Query Params');
			}

			redisClient.lrange(query, 0, -1, (err, results) => {
				if (err) {
					reject(err);
					throw Error(err);
				}
				resolve(results);
			});
		})
};

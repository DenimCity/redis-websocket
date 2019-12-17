import shortid from 'shortid';

const { retreiveData, storeMessage } = require('../utils/redis');

const allBaskets = async (req, res) => {
	const results = await retreiveData('basket');
	const flex = results.map((k) => JSON.parse(k));

	res.send({ message: `${flex.length} number of Items in basket`, flex });
};

const addBasket = async (req, res) => {
	const { basket } = req.body;

	const data = {
		id: shortid.generate(),
		createdAt: new Date().toISOString(),
		item: basket.name
	};

	const response = await storeMessage('basket', data);
	if (response) {
		return res.send({ message: 'Basket Item Added', data });
	}
	return res.status(404).send({ message: 'Basket Item Not Added' });
};

const getBasketsById = async (req, res) => {
	const { uuid, field } = req.query;

	const results = await retreiveData(field);
	const flex = results.map((k) => JSON.parse(k)).filter((x) => x.id === uuid);

	const length = flex.length > 0;
	let message;
	let data;
	switch (length) {
		case true:
			message = `Found item in basket`;
			data = flex[0];
			break;
		case false:
			message = `Item not found in basket`;
			data = [];
			break;
		default:
			return (message = `Error`);
	}
	res.send({ message, data });
};
module.exports = { allBaskets, addBasket, getBasketsById };

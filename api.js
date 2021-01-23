const fetch = require('node-fetch');

const EXCHANGE_API_URL = 'https://api.exchangeratesapi.io/latest';

const handleFetchExchangeRate = (req, res, next) => {
	const { base, currency } = req.query;

	const queryString = `${EXCHANGE_API_URL}?base=${base}&symbols=${currency}`;

	fetch(queryString)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}

			throw new Error('Something went wrong while fetching rates');
		})
		.then((data) => {
			res.json({
				results: data,
			});
		})
		.catch(next);
};

module.exports = handleFetchExchangeRate;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { validFetchExchangeRates, validate } = require('./validation');
const middlewares = require('./middlewares');

const app = express();

app.use(helmet());
app.use(cors());

app.get('/api/rates', validFetchExchangeRates, validate, require('./api.js'));

app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log('Listening on port', port);
});

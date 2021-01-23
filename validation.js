const { validationResult, query } = require('express-validator');

exports.validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

exports.validFetchExchangeRates = [
	query('base', 'this field is required').isString(),
	query('currency', 'this field is required')
		.isString()
		.custom((value) => {
			const errorMessage =
				'this field should contain valid comma seperated currency symbols';

			if (typeof value !== 'string') {
				throw new Error(errorMessage);
			}

			const currencyArray = value.split(',');
			let isCurrenciesListValid = true;

			currencyArray.some((currency) => {
				// check if each currency symbol is a valid string
				if (currency.length === 3 && /^[A-Z]+$/.test(currency)) {
					return false;
				}

				isCurrenciesListValid = false;
				return true;
			});

			if (!isCurrenciesListValid) {
				throw new Error(errorMessage);
			}

			return true;
		}),
];

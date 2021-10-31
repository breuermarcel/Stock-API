const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    let responseData = {
        version: '1.0',
        licence: 'MIT',
        routes: {
            stocks: {
                name: 'Stocks',
                description: '',
                route: '/stock/',
                additionalParams: {
                    q: {
                        param: 'q',
                        name: 'query',
                        route: '/stock/?q=',
                        description: 'Search for a stock by name, wkn or symbol.'
                    }
                }
            },

            chart: {
                name: 'Current Financial Chart',
                description: 'Get the current and historical data from a stock',
                route: '/stock/:symbol/chart',
                additionalParams: {

                }
            }
        }
    };

    res.status(200).json({
        error: null,
        response: responseData
    });
});

module.exports = router;

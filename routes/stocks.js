const express = require('express');
const axios = require("axios");
const router = express.Router();

const defaultRoute = 'https://query1.finance.yahoo.com/v1/finance/search?q=';

/**
 * Search for stocks.
 */
router.get('/', async (req, res) => {
    let query = req.query.q;

    if (query.length <= 0) {
        res.status(403).json({
            error: true,
            response: {
                error: 'Please search for a valid stock.'
            }
        });
    }

    let url = defaultRoute + query;

    axios.get(url)
        .then(response => {
            let stocks = {};

            for (let [key, stock] of Object.entries(response.data.quotes)) {
                Object.assign(stocks, {
                    [key]: {
                        name: stock.longname,
                        symbol: stock.symbol,
                        exchange: stock.exchDisp
                    }
                });
            }

            res.status(200).json({
                error: false,
                response: {
                    count: response.data.quotes.length,
                    stocks: stocks
                }
            });
        })
        .catch(error => {
            res.status(404).json({
                error: true,
                response: {
                    count: 0,
                    stocks: {}
                }
            })
        });
});


/**
 * Show information about the stock.
 */
router.get('/:symbol', async (req, res) => {

});


module.exports = router;
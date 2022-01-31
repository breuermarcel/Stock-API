const express = require("express");
const axios = require("axios");
const {response} = require("express");
const router = express.Router();

/**
 * Search for stocks.
 */
router.get("/", async (req, res) => {
    const defaultRoute = "https://query1.finance.yahoo.com/v1/finance/search?q=";

    // @todo validate
    let query = req.query.q;

    if (Object.keys(req.query).length === 0) {
        res.status(404).json({
            error: true, status: 404
        });
    }

    axios.get(defaultRoute + query)
        .then(response => {
            let stocks = {};

            for (let [key, stock] of Object.entries(response.data.quotes)) {
                Object.assign(stocks, {
                    [key]: {
                        name: stock.longname, symbol: stock.symbol, exchange: stock.exchDisp
                    }
                });
            }

            res.status(200).json({
                error: false, status: 200, response: {
                    count: response.data.quotes.length, stocks: stocks
                }
            });
        })
        .catch(error => {
            res.status(503).json({
                error: true, status: 503
            });
        });
});


/**
 * Show information about the stock.
 */
router.get("/:symbol", async (req, res) => {
    const defaultRoute = "https://query2.finance.yahoo.com/v10/finance/quoteSummary/";
    const modules = "?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend";
    const url = defaultRoute + req.params.symbol + modules;

    axios.get(url)
        .then(response => {
            res.status(200).json({
                error: false, status: 200, response: {
                    //@todo
                    profile: {
                        name: '',
                        symbol: '',
                        address: response.data.quoteSummary.result[0].assetProfile.address1,
                        "city": response.data.quoteSummary.result[0].assetProfile.city,
                        "state": response.data.quoteSummary.result[0].assetProfile.state,
                        "zip": response.data.quoteSummary.result[0].assetProfile.zip,
                        "country": response.data.quoteSummary.result[0].assetProfile.country,
                        "phone": response.data.quoteSummary.result[0].assetProfile.phone,
                        "website": response.data.quoteSummary.result[0].assetProfile.website,
                        "industry": response.data.quoteSummary.result[0].assetProfile.industry,
                        "sector": response.data.quoteSummary.result[0].assetProfile.sector,
                        "businessSummary": response.data.quoteSummary.result[0].assetProfile.businessSummary,
                        "employees": response.data.quoteSummary.result[0].assetProfile.fullTimeEmployees,
                    },

                    recommendations: {

                    },

                    finance: {

                    },

                    esg: {

                    }
                }
            });
        })
        .catch(error => {
            res.status(404).json({
                error: true, status: 404
            });
        });
});

router.get("/:symbol/chart", async (req, res) => {
    const defaultRoute = "https://query1.finance.yahoo.com/v8/finance/chart/";
    const url = defaultRoute + req.params.symbol;

    axios.get(url)
        .then(response => {
            res.status(200).json({
                error: false, status: 200, response: {
                    symbol: response.data.chart.result[0].meta.symbol,
                    timestamps: response.data.chart.result[0].timestamp,
                    quotes: {
                        volume: response.data.chart.result[0].indicators.quote[0].volume,
                        open: response.data.chart.result[0].indicators.quote[0].open,
                        close: response.data.chart.result[0].indicators.quote[0].close,
                        high: response.data.chart.result[0].indicators.quote[0].high,
                        low: response.data.chart.result[0].indicators.quote[0].low
                    }
                }
            });
        })
        .catch(error => {
            res.status(404).json({
                error: true, status: 404
            });
        });
});


module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.status(200).json({
        "error": false, "status": 200, "response": {
            "version": "1.0", "licence": "MIT", "routes": {
                "stocks": {
                    "name": "Stocks", "description": "", "route": "/stocks/", "additionalParams": {
                        "q": {
                            "param": "q",
                            "name": "Query",
                            "route": "/stocks/?q=",
                            "description": "Search for a specific stock by name, wkn or symbol."
                        }
                    }
                },

                "chart": {
                    "name": "Current Financial Chart",
                    "description": "Get the current and historical data from a stock.",
                    "route": "/stocks/:symbol/chart/",
                    "additionalParams": {}
                },

                "financialData": {
                    "name": "Financial Data",
                    "description": "Get the current financial data from a specific company.",
                    "route": "/stocks/:symbol/finance/",
                    "additionalParams": {}
                }
            }
        }
    });
});

module.exports = router;

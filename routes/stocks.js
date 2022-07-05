const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * Search for stocks.
 */
router.get("/", async (req, res) => {
    const defaultRoute = "https://query1.finance.yahoo.com/v1/finance/search?q=";

    // @todo validate
    let query = req.query.q.toUpperCase();

    if (Object.keys(req.query).length === 0) {
        res.status(404).json({
            "error": true
        });
    }

    axios.get(defaultRoute + query)
        .then(response => {
            let stocks = {};

            for (let [key, stock] of Object.entries(response.data.quotes)) {
                Object.assign(stocks, {
                    [key]: {
                        "name": stock.longname, "symbol": stock.symbol, "exchange": stock.exchDisp
                    }
                });
            }

            res.status(200).json({
                "error": false, "response": {
                    "count": response.data.quotes.length, "stocks": stocks
                }
            });
        })
        .catch(error => {
            res.status(503).json({
                "error": true,
            });
        });
});

/**
 * Show information about the stock.
 */
router.get("/:symbol", async (req, res) => {
    const defaultRoute = "https://query2.finance.yahoo.com/v10/finance/quoteSummary/";
    const modules = "?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend";
    const url = defaultRoute + req.params.symbol.toUpperCase() + modules;
    let responseData = {
        "profile": {
            "name": null,
            "symbol": null,
            "address": null,
            "city": null,
            "state": null,
            "zip": null,
            "country": null,
            "phone": null,
            "website": null,
            "industry": null,
            "sector": null,
            "businessSummary": null,
            "employees": null
        }, "recommendations": {
            "strongBuy": null,
            "buy": null,
            "hold": null,
            "sell": null,
            "strongSell": null
        }, "ratings": {}, "finance": {
            "currency": null,
            "currencySymbol": null,
            "netIncome": {
                "raw": null,
                "fmt": null
            },
            "depreciation": {
                "raw": null,
                "fmt": null
            },
            "totalCashFromOperatingActivities": {
                "raw": null,
                "fmt": null
            },
            "capitalExpenditures": {
                "raw": null,
                "fmt": null
            },
            "investments": {
                "raw": null,
                "fmt": null
            },
            "lastSplitFactor": {
                "fmt": null
            },
            "dividendsPaid": {
                "raw": null,
                "fmt": null
            },
            "lastDividendValue": {
                "raw": null,
                "fmt": null
            },
            "lastDividendDate": {
                "raw": null,
                "fmt": null
            },
            "dividendRate": {
                "raw": null,
                "fmt": null
            }, "dividendYield": {
                "raw": null,
                "fmt": null
            }, "trailingAnnualDividendRate": {
                "raw": null,
                "fmt": null
            }, "trailingAnnualDividendYield": {
                "raw": null,
                "fmt": null
            },
            "netBorrowings": {
                "raw": null,
                "fmt": null
            },
            "totalCashFromFinancingActivities": {
                "raw": null,
                "fmt": null
            },
            "issuanceOfStock": {
                "raw": null,
                "fmt": null
            },
            "peRatio": {
                "raw": null,
                "fmt": null
            },
            "pegRatio": {
                "raw": null,
                "fmt": null
            },
            "forwardPE": {
                "raw": null,
                "fmt": null
            },
            "floatShares": {
                "raw": null,
                "fmt": null
            },
            "sharesOutstanding": {
                "raw": null,
                "fmt": null
            },
            "sharesShort": {
                "raw": null,
                "fmt": null
            },
            "shortRatio": {
                "raw": null,
                "fmt": null
            },
            "sharesPercentSharesOut": {
                "raw": null,
                "fmt": null
            },
            "heldPercentInsiders": {
                "raw": null,
                "fmt": null
            }, "heldPercentInstitutions": {
                "raw": null,
                "fmt": null
            }, "bookValue": {
                "raw": null,
                "fmt": null
            }, "priceToBook": {
                "raw": null,
                "fmt": null
            }, "earningsQuarterlyGrowth": {
                "raw": null,
                "fmt": null
            }, "netIncomeToCommon": {
                "raw": null,
                "fmt": null
            }, "trailingEps": {
                "raw": null,
                "fmt": null
            }, "forwardEps": {
                "raw": null,
                "fmt": null
            }, "enterpriseToRevenue": {
                "raw": null,
                "fmt": null
            }, "enterpriseToEbitda": {
                "raw": null,
                "fmt": null
            },
            "totalRevenue": {
                "raw": null,
                "fmt": null
            }, "costOfRevenue": {
                "raw": null,
                "fmt": null
            }, "grossProfit": {
                "raw": null,
                "fmt": null
            }, "researchDevelopment": {
                "raw": null,
                "fmt": null
            }, "sellingGeneralAdministrative": {
                "raw": null,
                "fmt": null
            }, "totalOperatingExpenses": {
                "raw": null,
                "fmt": null
            }, "operatingIncome": {
                "raw": null,
                "fmt": null
            }, "totalOtherIncomeExpenseNet": {
                "raw": null,
                "fmt": null
            }, "ebit": {
                "raw": null,
                "fmt": null
            },
            "interestExpense": {
                "raw": null,
                "fmt": null
            },
            "incomeBeforeTax": {
                "raw": null,
                "fmt": null
            },
            "incomeTaxExpense": {
                "raw": null,
                "fmt": null
            }, "netIncomeFromContinuingOps": {
                "raw": null,
                "fmt": null
            }, "netIncomeApplicableToCommonShares": {
                "raw": null,
                "fmt": null
            }, "payoutRatio": {
                "raw": null,
                "fmt": null
            }, "trailingPE": {
                "raw": null,
                "fmt": null
            }, "volume": {
                "raw": null,
                "fmt": null
            }, "regularMarketVolume": {
                "raw": null,
                "fmt": null
            }, "averageVolume": {
                "raw": null,
                "fmt": null
            }, "marketCap": {
                "raw": null,
                "fmt": null
            },
            "totalCash": {
                "raw": null,
                "fmt": null
            }, "totalCashPerShare": {
                "raw": null,
                "fmt": null
            }, "ebitda": {
                "raw": null,
                "fmt": null
            }, "totalDebt": {
                "raw": null,
                "fmt": null
            }, "debtToEquity": {
                "raw": null,
                "fmt": null
            }, "revenuePerShare": {
                "raw": null,
                "fmt": null
            }, "returnOnAssets": {
                "raw": null,
                "fmt": null
            }, "returnOnEquity": {
                "raw": null,
                "fmt": null
            }, "grossProfits": {
                "raw": null,
                "fmt": null
            }, "freeCashflow": {
                "raw": null,
                "fmt": null
            }, "operatingCashflow": {
                "raw": null,
                "fmt": null
            }, "earningsGrowth": {
                "raw": null,
                "fmt": null
            }, "revenueGrowth": {
                "raw": null,
                "fmt": null
            }, "grossMargins": {
                "raw": null,
                "fmt": null
            }, "operatingMargins": {
                "raw": null,
                "fmt": null
            }, "profitMargins": {
                "raw": null,
                "fmt": null
            }, "ebitdaMargins": {
                "raw": null,
                "fmt": null
            }
        }, "balanceSheet": {
            "date": {
                "raw": null,
                "fmt": null
            },
            "cash": {
                "raw": null,
                "fmt": null
            },
            "shortTermInvestments": {
                "raw": null,
                "fmt": null
            }, "netReceivables": {
                "raw": null,
                "fmt": null
            }, "inventory": {
                "raw": null,
                "fmt": null
            }, "otherCurrentAssets": {
                "raw": null,
                "fmt": null
            }, "totalCurrentAssets": {
                "raw": null,
                "fmt": null
            }, "longTermInvestments": {
                "raw": null,
                "fmt": null
            }, "propertyPlantEquipment": {
                "raw": null,
                "fmt": null
            }, "otherAssets": {
                "raw": null,
                "fmt": null
            }, "totalAssets": {
                "raw": null,
                "fmt": null
            }, "shortLongTermDebt": {
                "raw": null,
                "fmt": null
            }, "accountsPayable": {
                "raw": null,
                "fmt": null
            }, "otherCurrentLiab": {
                "raw": null,
                "fmt": null
            }, "longTermDebt": {
                "raw": null,
                "fmt": null
            }, "otherLiab": {
                "raw": null,
                "fmt": null
            }, "totalCurrentLiabilities": {
                "raw": null,
                "fmt": null
            }, "totalLiab": {
                "raw": null,
                "fmt": null
            }, "commonStock": {
                "raw": null,
                "fmt": null
            }, "retainedEarnings": {
                "raw": null,
                "fmt": null
            }, "treasuryStock": {
                "raw": null,
                "fmt": null
            }, "otherStockholderEquity": {
                "raw": null,
                "fmt": null
            }, "totalStockholderEquity": {
                "raw": null,
                "fmt": null
            }, "netTangibleAssets": {
                "raw": null,
                "fmt": null
            }
        }, "esg": {
            "year": null,
            "peerGroup": null,
            "peerEsgScorePerformance": null,
            "total": {
                "raw": null,
                "fmt": null
            }, "environment": {
                "raw": null,
                "fmt": null
            }, "social": {
                "raw": null,
                "fmt": null
            }, "governance": {
                "raw": null,
                "fmt": null
            }
        }
    };

    axios.get(url)
        .then(response => {
            if (response.data.hasOwnProperty("quoteSummary")) {
                if (response.data.quoteSummary.hasOwnProperty("result")) {
                    if (response.data.quoteSummary.result[0].hasOwnProperty("price")) {
                        if (response.data.quoteSummary.result[0].price.hasOwnProperty("longName")) {
                            responseData.profile.name = response.data.quoteSummary.result[0].price.longName;
                        }

                        if (response.data.quoteSummary.result[0].price.hasOwnProperty("symbol")) {
                            responseData.profile.symbol = response.data.quoteSummary.result[0].price.symbol;
                        }

                        if (response.data.quoteSummary.result[0].price.hasOwnProperty("currency")) {
                            responseData.finance.currency = response.data.quoteSummary.result[0].price.currency;
                        }

                        if (response.data.quoteSummary.result[0].price.hasOwnProperty("currencySymbol")) {
                            responseData.finance.currencySymbol = response.data.quoteSummary.result[0].price.currencySymbol;
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("assetProfile")) {
                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("address1")) {
                            responseData.profile.address = response.data.quoteSummary.result[0].assetProfile.address1;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("city")) {
                            responseData.profile.city = response.data.quoteSummary.result[0].assetProfile.city;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("state")) {
                            responseData.profile.state = response.data.quoteSummary.result[0].assetProfile.state;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("zip")) {
                            responseData.profile.zip = response.data.quoteSummary.result[0].assetProfile.zip;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("country")) {
                            responseData.profile.country = response.data.quoteSummary.result[0].assetProfile.country;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("phone")) {
                            responseData.profile.phone = response.data.quoteSummary.result[0].assetProfile.phone;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("website")) {
                            responseData.profile.website = response.data.quoteSummary.result[0].assetProfile.website;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("industry")) {
                            responseData.profile.industry = response.data.quoteSummary.result[0].assetProfile.industry;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("sector")) {
                            responseData.profile.sector = response.data.quoteSummary.result[0].assetProfile.sector;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("longBusinessSummary")) {
                            responseData.profile.businessSummary = response.data.quoteSummary.result[0].assetProfile.longBusinessSummary;
                        }

                        if (response.data.quoteSummary.result[0].assetProfile.hasOwnProperty("fullTimeEmployees")) {
                            responseData.profile.employees = response.data.quoteSummary.result[0].assetProfile.fullTimeEmployees;
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("recommendationTrend")) {
                        if (response.data.quoteSummary.result[0].recommendationTrend.hasOwnProperty("trend")) {
                            if (response.data.quoteSummary.result[0].recommendationTrend.trend[0].hasOwnProperty("strongBuy")) {
                                responseData.recommendations.strongBuy = response.data.quoteSummary.result[0].recommendationTrend.trend[0].strongBuy;
                            }

                            if (response.data.quoteSummary.result[0].recommendationTrend.trend[0].hasOwnProperty("buy")) {
                                responseData.recommendations.buy = response.data.quoteSummary.result[0].recommendationTrend.trend[0].buy;
                            }

                            if (response.data.quoteSummary.result[0].recommendationTrend.trend[0].hasOwnProperty("hold")) {
                                responseData.recommendations.hold = response.data.quoteSummary.result[0].recommendationTrend.trend[0].hold;
                            }

                            if (response.data.quoteSummary.result[0].recommendationTrend.trend[0].hasOwnProperty("sell")) {
                                responseData.recommendations.sell = response.data.quoteSummary.result[0].recommendationTrend.trend[0].sell;
                            }

                            if (response.data.quoteSummary.result[0].recommendationTrend.trend[0].hasOwnProperty("strongSell")) {
                                responseData.recommendations.strongSell = response.data.quoteSummary.result[0].recommendationTrend.trend[0].strongSell;
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("upgradeDowngradeHistory")) {
                        if (response.data.quoteSummary.result[0].upgradeDowngradeHistory.hasOwnProperty("history")) {
                            responseData.ratings = response.data.quoteSummary.result[0].upgradeDowngradeHistory.history;
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("cashflowStatementHistory")) {
                        if (response.data.quoteSummary.result[0].cashflowStatementHistory.hasOwnProperty("cashflowStatements")) {
                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("netIncome")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netIncome.hasOwnProperty("raw")) {
                                    responseData.finance.netIncome.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netIncome.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netIncome.hasOwnProperty("fmt")) {
                                    responseData.finance.netIncome.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netIncome.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("depreciation")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].depreciation.hasOwnProperty("raw")) {
                                    responseData.finance.depreciation.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].depreciation.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].depreciation.hasOwnProperty("fmt")) {
                                    responseData.finance.depreciation.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].depreciation.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("depreciation")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.hasOwnProperty("raw")) {
                                    responseData.finance.totalCashFromOperatingActivities.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.hasOwnProperty("fmt")) {
                                    responseData.finance.totalCashFromOperatingActivities.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("capitalExpenditures")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.hasOwnProperty("raw")) {
                                    responseData.finance.capitalExpenditures.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.hasOwnProperty("fmt")) {
                                    responseData.finance.capitalExpenditures.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("investments")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].investments.hasOwnProperty("raw")) {
                                    responseData.finance.investments.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].investments.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].investments.hasOwnProperty("fmt")) {
                                    responseData.finance.investments.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].investments.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("dividendsPaid")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].dividendsPaid.hasOwnProperty("raw")) {
                                    responseData.finance.dividendsPaid.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].dividendsPaid.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].dividendsPaid.hasOwnProperty("fmt")) {
                                    responseData.finance.dividendsPaid.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].dividendsPaid.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("netBorrowings")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netBorrowings.hasOwnProperty("raw")) {
                                    responseData.finance.netBorrowings.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netBorrowings.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netBorrowings.hasOwnProperty("fmt")) {
                                    responseData.finance.netBorrowings.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netBorrowings.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("totalCashFromFinancingActivities")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.hasOwnProperty("raw")) {
                                    responseData.finance.totalCashFromFinancingActivities.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.hasOwnProperty("fmt")) {
                                    responseData.finance.totalCashFromFinancingActivities.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].hasOwnProperty("issuanceOfStock")) {
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.hasOwnProperty("raw")) {
                                    responseData.finance.issuanceOfStock.raw = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.raw;
                                }
                                if (response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.hasOwnProperty("fmt")) {
                                    responseData.finance.issuanceOfStock.fmt = response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.fmt;
                                }
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("indexTrend")) {
                        if (response.data.quoteSummary.result[0].indexTrend.hasOwnProperty("peRatio")) {
                            if (response.data.quoteSummary.result[0].indexTrend.peRatio.hasOwnProperty("raw")) {
                                responseData.finance.peRatio.raw = response.data.quoteSummary.result[0].indexTrend.peRatio.raw;
                            }
                            if (response.data.quoteSummary.result[0].indexTrend.peRatio.hasOwnProperty("fmt")) {
                                responseData.finance.peRatio.fmt = response.data.quoteSummary.result[0].indexTrend.peRatio.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].indexTrend.hasOwnProperty("pegRatio")) {
                            if (response.data.quoteSummary.result[0].indexTrend.pegRatio.hasOwnProperty("raw")) {
                                responseData.finance.pegRatio.raw = response.data.quoteSummary.result[0].indexTrend.pegRatio.raw;
                            }
                            if (response.data.quoteSummary.result[0].indexTrend.pegRatio.hasOwnProperty("fmt")) {
                                responseData.finance.pegRatio.fmt = response.data.quoteSummary.result[0].indexTrend.pegRatio.fmt;
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("defaultKeyStatistics")) {
                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("forwardPE")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.forwardPE.hasOwnProperty("raw")) {
                                responseData.finance.forwardPE.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.forwardPE.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.forwardPE.hasOwnProperty("fmt")) {
                                responseData.finance.forwardPE.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.forwardPE.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("floatShares")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.floatShares.hasOwnProperty("raw")) {
                                responseData.finance.floatShares.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.floatShares.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.floatShares.hasOwnProperty("fmt")) {
                                responseData.finance.floatShares.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.floatShares.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("sharesOutstanding")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.hasOwnProperty("raw")) {
                                responseData.finance.sharesOutstanding.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.hasOwnProperty("fmt")) {
                                responseData.finance.sharesOutstanding.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("sharesShort")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.sharesShort.hasOwnProperty("raw")) {
                                responseData.finance.sharesShort.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesShort.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.sharesShort.hasOwnProperty("fmt")) {
                                responseData.finance.sharesShort.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesShort.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("shortRatio")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.shortRatio.hasOwnProperty("raw")) {
                                responseData.finance.shortRatio.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.shortRatio.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.shortRatio.hasOwnProperty("fmt")) {
                                responseData.finance.shortRatio.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.shortRatio.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("sharesPercentSharesOut")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.sharesPercentSharesOut.hasOwnProperty("raw")) {
                                responseData.finance.sharesPercentSharesOut.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesPercentSharesOut.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.sharesPercentSharesOut.hasOwnProperty("fmt")) {
                                responseData.finance.sharesPercentSharesOut.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesPercentSharesOut.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("heldPercentInsiders")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInsiders.hasOwnProperty("raw")) {
                                responseData.finance.heldPercentInsiders.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInsiders.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInsiders.hasOwnProperty("fmt")) {
                                responseData.finance.heldPercentInsiders.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInsiders.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("heldPercentInstitutions")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInstitutions.hasOwnProperty("raw")) {
                                responseData.finance.heldPercentInstitutions.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInstitutions.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInstitutions.hasOwnProperty("fmt")) {
                                responseData.finance.heldPercentInstitutions.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInstitutions.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("bookValue")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.bookValue.hasOwnProperty("raw")) {
                                responseData.finance.bookValue.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.bookValue.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.bookValue.hasOwnProperty("fmt")) {
                                responseData.finance.bookValue.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.bookValue.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("priceToBook")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.hasOwnProperty("raw")) {
                                responseData.finance.priceToBook.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.hasOwnProperty("fmt")) {
                                responseData.finance.priceToBook.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("earningsQuarterlyGrowth")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.earningsQuarterlyGrowth.hasOwnProperty("raw")) {
                                responseData.finance.earningsQuarterlyGrowth.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.earningsQuarterlyGrowth.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.earningsQuarterlyGrowth.hasOwnProperty("fmt")) {
                                responseData.finance.earningsQuarterlyGrowth.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.earningsQuarterlyGrowth.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("netIncomeToCommon")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.netIncomeToCommon.hasOwnProperty("raw")) {
                                responseData.finance.netIncomeToCommon.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.netIncomeToCommon.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.netIncomeToCommon.hasOwnProperty("fmt")) {
                                responseData.finance.netIncomeToCommon.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.netIncomeToCommon.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("trailingEps")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.trailingEps.hasOwnProperty("raw")) {
                                responseData.finance.trailingEps.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.trailingEps.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.trailingEps.hasOwnProperty("fmt")) {
                                responseData.finance.trailingEps.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.trailingEps.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("forwardEps")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.forwardEps.hasOwnProperty("raw")) {
                                responseData.finance.forwardEps.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.forwardEps.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.forwardEps.hasOwnProperty("fmt")) {
                                responseData.finance.forwardEps.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.forwardEps.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("lastSplitFactor")) {
                            responseData.finance.lastSplitFactor.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.lastSplitFactor;
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("enterpriseToRevenue")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToRevenue.hasOwnProperty("raw")) {
                                responseData.finance.enterpriseToRevenue.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToRevenue.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToRevenue.hasOwnProperty("fmt")) {
                                responseData.finance.enterpriseToRevenue.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToRevenue.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("enterpriseToEbitda")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.hasOwnProperty("raw")) {
                                responseData.finance.enterpriseToEbitda.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.hasOwnProperty("fmt")) {
                                responseData.finance.enterpriseToEbitda.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("lastDividendValue")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendValue.hasOwnProperty("raw")) {
                                responseData.finance.lastDividendValue.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendValue.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendValue.hasOwnProperty("fmt")) {
                                responseData.finance.lastDividendValue.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendValue.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].defaultKeyStatistics.hasOwnProperty("lastDividendDate")) {
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendDate.hasOwnProperty("raw")) {
                                responseData.finance.lastDividendDate.raw = response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendDate.raw;
                            }
                            if (response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendDate.hasOwnProperty("fmt")) {
                                responseData.finance.lastDividendDate.fmt = response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendDate.fmt;
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("incomeStatementHistory")) {
                        if (response.data.quoteSummary.result[0].incomeStatementHistory.hasOwnProperty("incomeStatementHistory")) {
                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("totalRevenue")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalRevenue.hasOwnProperty("raw")) {
                                    responseData.finance.totalRevenue.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalRevenue.hasOwnProperty("fmt")) {
                                    responseData.finance.totalRevenue.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalRevenue.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("costOfRevenue")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.hasOwnProperty("raw")) {
                                    responseData.finance.costOfRevenue.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.hasOwnProperty("fmt")) {
                                    responseData.finance.costOfRevenue.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("grossProfit")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].grossProfit.hasOwnProperty("raw")) {
                                    responseData.finance.grossProfit.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].grossProfit.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].grossProfit.hasOwnProperty("fmt")) {
                                    responseData.finance.grossProfit.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].grossProfit.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("researchDevelopment")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.hasOwnProperty("raw")) {
                                    responseData.finance.researchDevelopment.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.hasOwnProperty("fmt")) {
                                    responseData.finance.researchDevelopment.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("sellingGeneralAdministrative")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.hasOwnProperty("raw")) {
                                    responseData.finance.sellingGeneralAdministrative.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.hasOwnProperty("fmt")) {
                                    responseData.finance.sellingGeneralAdministrative.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("totalOperatingExpenses")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.hasOwnProperty("raw")) {
                                    responseData.finance.totalOperatingExpenses.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.hasOwnProperty("fmt")) {
                                    responseData.finance.totalOperatingExpenses.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("operatingIncome")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].operatingIncome.hasOwnProperty("raw")) {
                                    responseData.finance.operatingIncome.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].operatingIncome.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].operatingIncome.hasOwnProperty("fmt")) {
                                    responseData.finance.operatingIncome.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].operatingIncome.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("totalOtherIncomeExpenseNet")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.hasOwnProperty("raw")) {
                                    responseData.finance.totalOtherIncomeExpenseNet.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.hasOwnProperty("fmt")) {
                                    responseData.finance.totalOtherIncomeExpenseNet.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("ebit")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].ebit.hasOwnProperty("raw")) {
                                    responseData.finance.ebit.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].ebit.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].ebit.hasOwnProperty("fmt")) {
                                    responseData.finance.ebit.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].ebit.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("interestExpense")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].interestExpense.hasOwnProperty("raw")) {
                                    responseData.finance.interestExpense.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].interestExpense.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].interestExpense.hasOwnProperty("fmt")) {
                                    responseData.finance.interestExpense.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].interestExpense.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("incomeBeforeTax")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.hasOwnProperty("raw")) {
                                    responseData.finance.incomeBeforeTax.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.hasOwnProperty("fmt")) {
                                    responseData.finance.incomeBeforeTax.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("incomeTaxExpense")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.hasOwnProperty("raw")) {
                                    responseData.finance.incomeTaxExpense.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.hasOwnProperty("fmt")) {
                                    responseData.finance.incomeTaxExpense.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("netIncomeFromContinuingOps")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.hasOwnProperty("raw")) {
                                    responseData.finance.netIncomeFromContinuingOps.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.hasOwnProperty("fmt")) {
                                    responseData.finance.netIncomeFromContinuingOps.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].hasOwnProperty("netIncomeApplicableToCommonShares")) {
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.hasOwnProperty("raw")) {
                                    responseData.finance.netIncomeApplicableToCommonShares.raw = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.raw;
                                }
                                if (response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.hasOwnProperty("fmt")) {
                                    responseData.finance.netIncomeApplicableToCommonShares.fmt = response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.fmt;
                                }
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("summaryDetail")) {
                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("dividendRate")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.dividendRate.hasOwnProperty("raw")) {
                                responseData.finance.dividendRate.raw = response.data.quoteSummary.result[0].summaryDetail.dividendRate.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.dividendRate.hasOwnProperty("fmt")) {
                                responseData.finance.dividendRate.fmt = response.data.quoteSummary.result[0].summaryDetail.dividendRate.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("dividendYield")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.dividendYield.hasOwnProperty("raw")) {
                                responseData.finance.dividendYield.raw = response.data.quoteSummary.result[0].summaryDetail.dividendYield.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.dividendYield.hasOwnProperty("fmt")) {
                                responseData.finance.dividendYield.fmt = response.data.quoteSummary.result[0].summaryDetail.dividendYield.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("payoutRatio")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.payoutRatio.hasOwnProperty("raw")) {
                                responseData.finance.payoutRatio.raw = response.data.quoteSummary.result[0].summaryDetail.payoutRatio.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.payoutRatio.hasOwnProperty("fmt")) {
                                responseData.finance.payoutRatio.fmt = response.data.quoteSummary.result[0].summaryDetail.payoutRatio.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("trailingPE")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.trailingPE.hasOwnProperty("raw")) {
                                responseData.finance.trailingPE.raw = response.data.quoteSummary.result[0].summaryDetail.trailingPE.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.trailingPE.hasOwnProperty("fmt")) {
                                responseData.finance.trailingPE.fmt = response.data.quoteSummary.result[0].summaryDetail.trailingPE.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("volume")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.volume.hasOwnProperty("raw")) {
                                responseData.finance.volume.raw = response.data.quoteSummary.result[0].summaryDetail.volume.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.volume.hasOwnProperty("fmt")) {
                                responseData.finance.volume.fmt = response.data.quoteSummary.result[0].summaryDetail.volume.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("regularMarketVolume")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.regularMarketVolume.hasOwnProperty("raw")) {
                                responseData.finance.regularMarketVolume.raw = response.data.quoteSummary.result[0].summaryDetail.regularMarketVolume.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.regularMarketVolume.hasOwnProperty("fmt")) {
                                responseData.finance.regularMarketVolume.fmt = response.data.quoteSummary.result[0].summaryDetail.regularMarketVolume.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("averageVolume")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.averageVolume.hasOwnProperty("raw")) {
                                responseData.finance.averageVolume.raw = response.data.quoteSummary.result[0].summaryDetail.averageVolume.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.averageVolume.hasOwnProperty("fmt")) {
                                responseData.finance.averageVolume.fmt = response.data.quoteSummary.result[0].summaryDetail.averageVolume.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("marketCap")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.marketCap.hasOwnProperty("raw")) {
                                responseData.finance.marketCap.raw = response.data.quoteSummary.result[0].summaryDetail.marketCap.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.marketCap.hasOwnProperty("fmt")) {
                                responseData.finance.marketCap.fmt = response.data.quoteSummary.result[0].summaryDetail.marketCap.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("trailingAnnualDividendRate")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendRate.hasOwnProperty("raw")) {
                                responseData.finance.trailingAnnualDividendRate.raw = response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendRate.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendRate.hasOwnProperty("fmt")) {
                                responseData.finance.trailingAnnualDividendRate.fmt = response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendRate.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].summaryDetail.hasOwnProperty("trailingAnnualDividendYield")) {
                            if (response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendYield.hasOwnProperty("raw")) {
                                responseData.finance.trailingAnnualDividendYield.raw = response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendYield.raw;
                            }
                            if (response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendYield.hasOwnProperty("fmt")) {
                                responseData.finance.trailingAnnualDividendYield.fmt = response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendYield.fmt;
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("financialData")) {
                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("totalCash")) {
                            if (response.data.quoteSummary.result[0].financialData.totalCash.hasOwnProperty("raw")) {
                                responseData.finance.totalCash.raw = response.data.quoteSummary.result[0].financialData.totalCash.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.totalCash.hasOwnProperty("fmt")) {
                                responseData.finance.totalCash.fmt = response.data.quoteSummary.result[0].financialData.totalCash.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("totalCashPerShare")) {
                            if (response.data.quoteSummary.result[0].financialData.totalCashPerShare.hasOwnProperty("raw")) {
                                responseData.finance.totalCashPerShare.raw = response.data.quoteSummary.result[0].financialData.totalCashPerShare.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.totalCashPerShare.hasOwnProperty("fmt")) {
                                responseData.finance.totalCashPerShare.fmt = response.data.quoteSummary.result[0].financialData.totalCashPerShare.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("ebitda")) {
                            if (response.data.quoteSummary.result[0].financialData.ebitda.hasOwnProperty("raw")) {
                                responseData.finance.ebitda.raw = response.data.quoteSummary.result[0].financialData.ebitda.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.ebitda.hasOwnProperty("fmt")) {
                                responseData.finance.ebitda.fmt = response.data.quoteSummary.result[0].financialData.ebitda.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("totalDebt")) {
                            if (response.data.quoteSummary.result[0].financialData.totalDebt.hasOwnProperty("raw")) {
                                responseData.finance.totalDebt.raw = response.data.quoteSummary.result[0].financialData.totalDebt.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.totalDebt.hasOwnProperty("fmt")) {
                                responseData.finance.totalDebt.fmt = response.data.quoteSummary.result[0].financialData.totalDebt.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("debtToEquity")) {
                            if (response.data.quoteSummary.result[0].financialData.debtToEquity.hasOwnProperty("raw")) {
                                responseData.finance.debtToEquity.raw = response.data.quoteSummary.result[0].financialData.debtToEquity.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.debtToEquity.hasOwnProperty("fmt")) {
                                responseData.finance.debtToEquity.fmt = response.data.quoteSummary.result[0].financialData.debtToEquity.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("revenuePerShare")) {
                            if (response.data.quoteSummary.result[0].financialData.revenuePerShare.hasOwnProperty("raw")) {
                                responseData.finance.revenuePerShare.raw = response.data.quoteSummary.result[0].financialData.revenuePerShare.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.revenuePerShare.hasOwnProperty("fmt")) {
                                responseData.finance.revenuePerShare.fmt = response.data.quoteSummary.result[0].financialData.revenuePerShare.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("returnOnAssets")) {
                            if (response.data.quoteSummary.result[0].financialData.returnOnAssets.hasOwnProperty("raw")) {
                                responseData.finance.returnOnAssets.raw = response.data.quoteSummary.result[0].financialData.returnOnAssets.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.returnOnAssets.hasOwnProperty("fmt")) {
                                responseData.finance.returnOnAssets.fmt = response.data.quoteSummary.result[0].financialData.returnOnAssets.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("revenuePerShare")) {
                            if (response.data.quoteSummary.result[0].financialData.returnOnEquity.hasOwnProperty("raw")) {
                                responseData.finance.returnOnEquity.raw = response.data.quoteSummary.result[0].financialData.returnOnEquity.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.returnOnEquity.hasOwnProperty("fmt")) {
                                responseData.finance.returnOnEquity.fmt = response.data.quoteSummary.result[0].financialData.returnOnEquity.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("grossProfits")) {
                            if (response.data.quoteSummary.result[0].financialData.grossProfits.hasOwnProperty("raw")) {
                                responseData.finance.grossProfits.raw = response.data.quoteSummary.result[0].financialData.grossProfits.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.grossProfits.hasOwnProperty("fmt")) {
                                responseData.finance.grossProfits.fmt = response.data.quoteSummary.result[0].financialData.grossProfits.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("freeCashflow")) {
                            if (response.data.quoteSummary.result[0].financialData.freeCashflow.hasOwnProperty("raw")) {
                                responseData.finance.freeCashflow.raw = response.data.quoteSummary.result[0].financialData.freeCashflow.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.freeCashflow.hasOwnProperty("fmt")) {
                                responseData.finance.freeCashflow.fmt = response.data.quoteSummary.result[0].financialData.freeCashflow.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("operatingCashflow")) {
                            if (response.data.quoteSummary.result[0].financialData.operatingCashflow.hasOwnProperty("raw")) {
                                responseData.finance.operatingCashflow.raw = response.data.quoteSummary.result[0].financialData.operatingCashflow.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.operatingCashflow.hasOwnProperty("fmt")) {
                                responseData.finance.operatingCashflow.fmt = response.data.quoteSummary.result[0].financialData.operatingCashflow.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("earningsGrowth")) {
                            if (response.data.quoteSummary.result[0].financialData.earningsGrowth.hasOwnProperty("raw")) {
                                responseData.finance.earningsGrowth.raw = response.data.quoteSummary.result[0].financialData.earningsGrowth.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.earningsGrowth.hasOwnProperty("fmt")) {
                                responseData.finance.earningsGrowth.fmt = response.data.quoteSummary.result[0].financialData.earningsGrowth.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("revenueGrowth")) {
                            if (response.data.quoteSummary.result[0].financialData.revenueGrowth.hasOwnProperty("raw")) {
                                responseData.finance.revenueGrowth.raw = response.data.quoteSummary.result[0].financialData.revenueGrowth.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.revenueGrowth.hasOwnProperty("fmt")) {
                                responseData.finance.revenueGrowth.fmt = response.data.quoteSummary.result[0].financialData.revenueGrowth.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("grossMargins")) {
                            if (response.data.quoteSummary.result[0].financialData.grossMargins.hasOwnProperty("raw")) {
                                responseData.finance.grossMargins.raw = response.data.quoteSummary.result[0].financialData.grossMargins.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.grossMargins.hasOwnProperty("fmt")) {
                                responseData.finance.grossMargins.fmt = response.data.quoteSummary.result[0].financialData.grossMargins.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("operatingMargins")) {
                            if (response.data.quoteSummary.result[0].financialData.operatingMargins.hasOwnProperty("raw")) {
                                responseData.finance.operatingMargins.raw = response.data.quoteSummary.result[0].financialData.operatingMargins.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.operatingMargins.hasOwnProperty("fmt")) {
                                responseData.finance.operatingMargins.fmt = response.data.quoteSummary.result[0].financialData.operatingMargins.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("ebitdaMargins")) {
                            if (response.data.quoteSummary.result[0].financialData.ebitdaMargins.hasOwnProperty("raw")) {
                                responseData.finance.ebitdaMargins.raw = response.data.quoteSummary.result[0].financialData.ebitdaMargins.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.ebitdaMargins.hasOwnProperty("fmt")) {
                                responseData.finance.ebitdaMargins.fmt = response.data.quoteSummary.result[0].financialData.ebitdaMargins.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].financialData.hasOwnProperty("profitMargins")) {
                            if (response.data.quoteSummary.result[0].financialData.profitMargins.hasOwnProperty("raw")) {
                                responseData.finance.profitMargins.raw = response.data.quoteSummary.result[0].financialData.profitMargins.raw;
                            }
                            if (response.data.quoteSummary.result[0].financialData.profitMargins.hasOwnProperty("fmt")) {
                                responseData.finance.profitMargins.fmt = response.data.quoteSummary.result[0].financialData.profitMargins.fmt;
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("balanceSheetHistoryQuarterly")) {
                        if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.hasOwnProperty("balanceSheetStatements")) {
                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("endDate")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.date.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.date.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("cash")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.cash.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.cash.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("shortTermInvestments")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.shortTermInvestments.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.shortTermInvestments.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("netReceivables")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.netReceivables.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.netReceivables.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("inventory")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.inventory.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.inventory.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("otherCurrentAssets")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.otherCurrentAssets.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.otherCurrentAssets.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("totalCurrentAssets")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.totalCurrentAssets.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.totalCurrentAssets.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("longTermInvestments")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.longTermInvestments.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.longTermInvestments.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("propertyPlantEquipment")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.propertyPlantEquipment.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.propertyPlantEquipment.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("otherAssets")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.otherAssets.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.otherAssets.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("totalAssets")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.totalAssets.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.totalAssets.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("accountsPayable")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.accountsPayable.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.accountsPayable.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("shortLongTermDebt")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.shortLongTermDebt.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.shortLongTermDebt.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("otherCurrentLiab")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.otherCurrentLiab.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.otherCurrentLiab.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("longTermDebt")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.longTermDebt.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.longTermDebt.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("otherLiab")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.otherLiab.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.otherLiab.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("totalCurrentLiabilities")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.totalCurrentLiabilities.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.totalCurrentLiabilities.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("totalLiab")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.totalLiab.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.totalLiab.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("commonStock")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.commonStock.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.commonStock.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("retainedEarnings")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.retainedEarnings.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.retainedEarnings.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("treasuryStock")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.treasuryStock.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.treasuryStock.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("otherStockholderEquity")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.otherStockholderEquity.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.otherStockholderEquity.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("totalStockholderEquity")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.totalStockholderEquity.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.totalStockholderEquity.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.fmt;
                                }
                            }

                            if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].hasOwnProperty("netTangibleAssets")) {
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.hasOwnProperty("raw")) {
                                    responseData.balanceSheet.netTangibleAssets.raw = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.raw;
                                }
                                if (response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.hasOwnProperty("fmt")) {
                                    responseData.balanceSheet.netTangibleAssets.fmt = response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.fmt;
                                }
                            }
                        }
                    }

                    if (response.data.quoteSummary.result[0].hasOwnProperty("esgScores")) {
                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("ratingYear")) {
                            responseData.esg.year = response.data.quoteSummary.result[0].esgScores.ratingYear;
                        }

                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("peerGroup")) {
                            responseData.esg.peerGroup = response.data.quoteSummary.result[0].esgScores.peerGroup;
                        }

                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("peerEsgScorePerformance")) {
                            responseData.esg.peerEsgScorePerformance = response.data.quoteSummary.result[0].esgScores.peerEsgScorePerformance;
                        }

                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("totalEsg")) {
                            if (response.data.quoteSummary.result[0].esgScores.totalEsg.hasOwnProperty("raw")) {
                                responseData.esg.total.raw = response.data.quoteSummary.result[0].esgScores.totalEsg.raw;
                            }
                            if (response.data.quoteSummary.result[0].esgScores.totalEsg.hasOwnProperty("fmt")) {
                                responseData.esg.total.fmt = response.data.quoteSummary.result[0].esgScores.totalEsg.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("environmentScore")) {
                            if (response.data.quoteSummary.result[0].esgScores.environmentScore.hasOwnProperty("raw")) {
                                responseData.esg.environment.raw = response.data.quoteSummary.result[0].esgScores.environmentScore.raw;
                            }
                            if (response.data.quoteSummary.result[0].esgScores.environmentScore.hasOwnProperty("fmt")) {
                                responseData.esg.environment.fmt = response.data.quoteSummary.result[0].esgScores.environmentScore.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("environmentScore")) {
                            if (response.data.quoteSummary.result[0].esgScores.socialScore.hasOwnProperty("raw")) {
                                responseData.esg.social.raw = response.data.quoteSummary.result[0].esgScores.socialScore.raw;
                            }
                            if (response.data.quoteSummary.result[0].esgScores.socialScore.hasOwnProperty("fmt")) {
                                responseData.esg.social.fmt = response.data.quoteSummary.result[0].esgScores.socialScore.fmt;
                            }
                        }

                        if (response.data.quoteSummary.result[0].esgScores.hasOwnProperty("environmentScore")) {
                            if (response.data.quoteSummary.result[0].esgScores.governanceScore.hasOwnProperty("raw")) {
                                responseData.esg.governance.raw = response.data.quoteSummary.result[0].esgScores.governanceScore.raw;
                            }
                            if (response.data.quoteSummary.result[0].esgScores.governanceScore.hasOwnProperty("fmt")) {
                                responseData.esg.governance.fmt = response.data.quoteSummary.result[0].esgScores.governanceScore.fmt;
                            }
                        }
                    }
                }
            }

            res.status(200).json({
                "error": false, "response": responseData
            });
        })
        .catch(error => {
            res.status(404).json({
                "error": true,
            });
        });
});

router.get("/:symbol/profile", async (req, res) => {

});

router.get("/:symbol/recommendations", async(req, res) => {

});

router.get("/:symbol/cashflow", async(req, res) => {

});

router.get("/:symbol/income", async(req, res) => {

});

router.get("/:symbol/earnings", async(req, res) => {

});

router.get("/:symbol/balancesheet", async(req, res) => {

});

router.get("/:symbol/chart", async (req, res) => {
    const defaultRoute = "https://query1.finance.yahoo.com/v8/finance/chart/";
    const url = defaultRoute + req.params.symbol.toUpperCase();
    let responseData = {
        "symbol": null,
        "timestamps": null,
        "quotes": {
            "volume": null,
            "open": null,
            "close": null,
            "high": null,
            "low": null
        }
    };

    axios.get(url)
        .then(response => {
            if (response.data.hasOwnProperty("chart")) {

                if (response.data.chart.hasOwnProperty("result")) {
                    if (response.data.chart.result[0].hasOwnProperty("meta")) {
                        if (response.data.chart.result[0].meta.hasOwnProperty("symbol")) {
                            responseData.symbol = response.data.chart.result[0].meta.symbol;
                        }
                    }

                    if (response.data.chart.result[0].hasOwnProperty("timestamp")) {
                        responseData.timestamps = response.data.chart.result[0].timestamp;
                    }

                    if (response.data.chart.result[0].hasOwnProperty("indicators")) {
                        if (response.data.chart.result[0].indicators.hasOwnProperty("quote")) {
                            if (response.data.chart.result[0].indicators.quote[0].hasOwnProperty("volume")) {
                                responseData.quotes.volume = response.data.chart.result[0].indicators.quote[0].volume;
                            }

                            if (response.data.chart.result[0].indicators.quote[0].hasOwnProperty("open")) {
                                responseData.quotes.open = response.data.chart.result[0].indicators.quote[0].open;
                            }

                            if (response.data.chart.result[0].indicators.quote[0].hasOwnProperty("close")) {
                                responseData.quotes.close = response.data.chart.result[0].indicators.quote[0].close;
                            }

                            if (response.data.chart.result[0].indicators.quote[0].hasOwnProperty("high")) {
                                responseData.quotes.high = response.data.chart.result[0].indicators.quote[0].high;
                            }

                            if (response.data.chart.result[0].indicators.quote[0].hasOwnProperty("low")) {
                                responseData.quotes.low = response.data.chart.result[0].indicators.quote[0].low;
                            }
                        }
                    }
                }
            }

            res.status(200).json({
                "error": false, "response": responseData
            });
        })
        .catch(error => {
            res.status(404).json({
                "error": true,
            });
        });
});


module.exports = router;
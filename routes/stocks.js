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
            "error": true, "status": 404
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
                "error": false, "status": 200, "response": {
                    "count": response.data.quotes.length, "stocks": stocks
                }
            });
        })
        .catch(error => {
            res.status(503).json({
                "error": true, "status": 503
            });
        });
});


/**
 * Show information about the stock.
 */
router.get("/:symbol", async (req, res) => {
    const defaultRoute = "https://query2.finance.yahoo.com/v10/finance/quoteSummary/";
    const modules = "?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend";
    const url = defaultRoute + req.params.symbol.toUpperCase() + modules;

    axios.get(url)
        .then(response => {
            res.status(200).json({
                "error": false, "status": 200, "response": {
                    "profile": {
                        "name": response.data.quoteSummary.result[0].price.longName,
                        "symbol": response.data.quoteSummary.result[0].price.symbol,
                        "address": response.data.quoteSummary.result[0].assetProfile.address1,
                        "city": response.data.quoteSummary.result[0].assetProfile.city,
                        "state": response.data.quoteSummary.result[0].assetProfile.state,
                        "zip": response.data.quoteSummary.result[0].assetProfile.zip,
                        "country": response.data.quoteSummary.result[0].assetProfile.country,
                        "phone": response.data.quoteSummary.result[0].assetProfile.phone,
                        "website": response.data.quoteSummary.result[0].assetProfile.website,
                        "industry": response.data.quoteSummary.result[0].assetProfile.industry,
                        "sector": response.data.quoteSummary.result[0].assetProfile.sector,
                        "businessSummary": response.data.quoteSummary.result[0].assetProfile.businessSummary,
                        "employees": response.data.quoteSummary.result[0].assetProfile.fullTimeEmployees
                    },

                    "recommendations": {
                        "strongBuy": response.data.quoteSummary.result[0].recommendationTrend.trend[0].strongBuy,
                        "buy": response.data.quoteSummary.result[0].recommendationTrend.trend[0].buy,
                        "hold": response.data.quoteSummary.result[0].recommendationTrend.trend[0].hold,
                        "sell": response.data.quoteSummary.result[0].recommendationTrend.trend[0].sell,
                        "strongSell": response.data.quoteSummary.result[0].recommendationTrend.trend[0].strongSell,
                    },

                    "ratings": response.data.quoteSummary.result[0].upgradeDowngradeHistory.history,

                    "finance": {
                        "currency": response.data.quoteSummary.result[0].price.currency,
                        "currencySymbol": response.data.quoteSummary.result[0].price.currencySymbol,
                        "netIncome": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netIncome.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netIncome.fmt
                        },
                        "depreciation": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].depreciation.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].depreciation.fmt
                        },
                        "totalCashFromOperatingActivities": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.fmt
                        },
                        "capitalExpenditures": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.fmt
                        },
                        "investments": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].investments.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].investments.fmt
                        },
                        "dividendsPaid": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].dividendsPaid.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].dividendsPaid.fmt
                        },
                        "netBorrowings": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netBorrowings.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].netBorrowings.fmt
                        },
                        "totalCashFromFinancingActivities": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.fmt
                        },
                        "issuanceOfStock": {
                            "raw": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.raw,
                            "fmt": response.data.quoteSummary.result[0].cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.fmt
                        },
                        "peRatio": {
                            "raw": response.data.quoteSummary.result[0].indexTrend.peRatio.raw,
                            "fmt": response.data.quoteSummary.result[0].indexTrend.peRatio.fmt
                        },
                        "pegRatio": {
                            "raw": response.data.quoteSummary.result[0].indexTrend.pegRatio.raw,
                            "fmt": response.data.quoteSummary.result[0].indexTrend.pegRatio.fmt
                        },
                        "forwardPE": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.forwardPE.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.forwardPE.fmt
                        },
                        "profitMargins": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.profitMargins.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.profitMargins.fmt
                        },
                        "floatShares": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.floatShares.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.floatShares.fmt
                        },
                        "sharesOutstanding": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.fmt
                        },
                        "sharesShort": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.sharesShort.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.sharesShort.fmt
                        },
                        "shortRatio": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.shortRatio.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.shortRatio.fmt
                        },
                        "sharesPercentSharesOut": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.sharesPercentSharesOut.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.sharesPercentSharesOut.fmt
                        },
                        "heldPercentInsiders": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInsiders.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInsiders.fmt
                        },
                        "heldPercentInstitutions": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInstitutions.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.heldPercentInstitutions.fmt
                        },
                        "bookValue": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.bookValue.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.bookValue.fmt
                        },
                        "priceToBook": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.fmt
                        },
                        "earningsQuarterlyGrowth": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.earningsQuarterlyGrowth.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.earningsQuarterlyGrowth.fmt
                        },
                        "netIncomeToCommon": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.netIncomeToCommon.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.netIncomeToCommon.fmt
                        },
                        "trailingEps": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.trailingEps.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.trailingEps.fmt
                        },
                        "forwardEps": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.forwardEps.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.forwardEps.fmt
                        },
                        "lastSplitFactor": response.data.quoteSummary.result[0].defaultKeyStatistics.lastSplitFactor,
                        "enterpriseToRevenue": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToRevenue.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToRevenue.fmt
                        }, "enterpriseToEbitda": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.enterpriseToEbitda.fmt
                        }, "lastDividendValue": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendValue.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendValue.fmt
                        }, "lastDividendDate": {
                            "raw": response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendDate.raw,
                            "fmt": response.data.quoteSummary.result[0].defaultKeyStatistics.lastDividendDate.fmt
                        },
                        "totalRevenue": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalRevenue.fmt
                        },"costOfRevenue": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.fmt
                        },"grossProfit": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].grossProfit.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].grossProfit.fmt
                        },"researchDevelopment": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.fmt
                        },"sellingGeneralAdministrative": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.fmt
                        },"totalOperatingExpenses": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.fmt
                        },"operatingIncome": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].operatingIncome.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].operatingIncome.fmt
                        },"totalOtherIncomeExpenseNet": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.fmt
                        },"ebit": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].ebit.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].ebit.fmt
                        },"interestExpense": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].interestExpense.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].interestExpense.fmt
                        },"incomeBeforeTax": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.fmt
                        },"incomeTaxExpense": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.fmt
                        },"netIncomeFromContinuingOps": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.fmt
                        },"netIncomeApplicableToCommonShares": {
                            "raw": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.raw,
                            "fmt": response.data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.fmt
                        },
                        "dividendRate": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.dividendRate.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.dividendRate.fmt
                        },"dividendYield": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.dividendYield.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.dividendYield.fmt
                        },"payoutRatio": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.payoutRatio.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.payoutRatio.fmt
                        },"fiveYearAvgDividendYield": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.fiveYearAvgDividendYield.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.fiveYearAvgDividendYield.fmt
                        },"trailingPE": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.trailingPE.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.trailingPE.fmt
                        },"volume": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.volume.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.volume.fmt
                        },"regularMarketVolume": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.regularMarketVolume.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.regularMarketVolume.fmt
                        },"averageVolume": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.averageVolume.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.averageVolume.fmt
                        },"marketCap": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.marketCap.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.marketCap.fmt
                        },"trailingAnnualDividendRate": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendRate.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendRate.fmt
                        },"trailingAnnualDividendYield": {
                            "raw": response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendYield.raw,
                            "fmt": response.data.quoteSummary.result[0].summaryDetail.trailingAnnualDividendYield.fmt
                        },



                    },

                    "balanceSheet": {
                        "date": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.fmt
                        },"cash": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.fmt
                        },"shortTermInvestments": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.fmt
                        },"netReceivables": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.fmt
                        },"inventory": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.fmt
                        },"otherCurrentAssets": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.fmt
                        },"totalCurrentAssets": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.fmt
                        },"longTermInvestments": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.fmt
                        },"propertyPlantEquipment": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.fmt
                        },"otherAssets": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.fmt
                        },"totalAssets": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.fmt
                        },"accountsPayable": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.fmt
                        },"shortLongTermDebt": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.fmt
                        },"otherCurrentLiab": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.fmt
                        },"longTermDebt": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.fmt
                        },"otherLiab": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.fmt
                        },"totalCurrentLiabilities": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.fmt
                        },"totalLiab": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.fmt
                        },"commonStock": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.fmt
                        },"retainedEarnings": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.fmt
                        },"treasuryStock": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.fmt
                        },"otherStockholderEquity": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.fmt
                        },"totalStockholderEquity": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.fmt
                        },"netTangibleAssets": {
                            "raw": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.raw,
                            "fmt": response.data.quoteSummary.result[0].balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.fmt
                        }
                    },

                    "esg": {

                    }
                }
            });
        })
        .catch(error => {
            res.status(404).json({
                "error": true, "status": 404
            });
        });
});

router.get("/:symbol/chart", async (req, res) => {
    const defaultRoute = "https://query1.finance.yahoo.com/v8/finance/chart/";
    const url = defaultRoute + req.params.symbol.toUpperCase();

    axios.get(url)
        .then(response => {
            res.status(200).json({
                "error": false, "status": 200, "response": {
                    "symbol": response.data.chart.result[0].meta.symbol,
                    "timestamps": response.data.chart.result[0].timestamp,
                    "quotes": {
                        "volume": response.data.chart.result[0].indicators.quote[0].volume,
                        "open": response.data.chart.result[0].indicators.quote[0].open,
                        "close": response.data.chart.result[0].indicators.quote[0].close,
                        "high": response.data.chart.result[0].indicators.quote[0].high,
                        "low": response.data.chart.result[0].indicators.quote[0].low
                    }
                }
            });
        })
        .catch(error => {
            res.status(404).json({
                "error": true, "status": 404
            });
        });
});


module.exports = router;
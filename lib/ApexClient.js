"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexClient = void 0;
const Constant_1 = require("./Constant");
const service_1 = require("./service");
const starkex_lib_1 = require("./starkex-lib");
class ApexClient {
    constructor(env = Constant_1.PROD) {
        this.apiTool = new service_1.ApiTool(env);
        this.tradePublicApi = new service_1.TradePublicApi(this.apiTool);
    }
    async init(apiKeyCredentials, startPrivateKey, accountId, networkId) {
        let clientConfig = new service_1.ClientConfig();
        clientConfig.apiTool = this.apiTool;
        clientConfig.networkId = networkId;
        clientConfig.accountId = accountId;
        clientConfig.apiKeyCredentials = apiKeyCredentials;
        clientConfig.starkKeyPair = (0, starkex_lib_1.asSimpleKeyPair)((0, starkex_lib_1.asEcKeyPair)(startPrivateKey));
        clientConfig.clock = new service_1.Clock();
        this.tradeApi = new service_1.TradeApi(clientConfig);
        await this.initClock(clientConfig);
        await this.initConfig();
    }
    async initClock(clientConfig) {
        this.clientConfig = clientConfig;
        let { time } = await this.tradePublicApi.time();
        this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
    }
    async initConfig() {
        const symbols = {};
        let { perpetualContract: groupSymbols = [], currency, multiChain, global } = await this.tradePublicApi.symbols();
        if (groupSymbols.length) {
            groupSymbols.forEach((obj, idx) => {
                const symbolInfo = {
                    ...obj,
                };
                symbolInfo.rankIdx = idx;
                symbolInfo.pricePrecision = (0, service_1.getPrecision)(obj.tickSize);
                symbolInfo.priceStep = Number(obj.tickSize);
                symbolInfo.sizePrecision = (0, service_1.getPrecision)(obj.stepSize);
                symbolInfo.sizeStep = Number(obj.stepSize);
                symbolInfo.baseCoin = obj.settleCurrencyId;
                symbolInfo.currentCoin = obj.underlyingCurrencyId;
                const baseCoinInfo = currency.find((item) => item.id === symbolInfo.baseCoin) || {};
                const currentCoinInfo = currency.find((item) => item.id === symbolInfo.currentCoin) || {};
                symbolInfo.baseCoinPrecision = Math.abs(Math.log10(baseCoinInfo.showStep || 1));
                symbolInfo.baseCoinRealPrecision = Math.abs(Math.log10(baseCoinInfo.stepSize || 1));
                symbolInfo.currentCoinPrecision = Math.abs(Math.log10(currentCoinInfo.stepSize || 1));
                symbolInfo.baseCoinIcon = baseCoinInfo.iconUrl;
                symbolInfo.currentCoinIcon = currentCoinInfo.iconUrl;
                symbols[obj.symbol] = symbolInfo;
            });
        }
        (0, starkex_lib_1.setSymbols)(symbols);
        (0, starkex_lib_1.setCurrency)(currency);
        (0, starkex_lib_1.setConfig)({
            multiChain,
            global,
            currency,
        });
    }
}
exports.ApexClient = ApexClient;

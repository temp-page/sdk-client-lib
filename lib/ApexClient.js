"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApexClient = void 0;
const Constant_1 = require("./Constant");
const starkex_lib_1 = require("./starkex-lib");
const apexpro_1 = require("./apexpro");
const PublicApi_1 = require("./PublicApi");
const PrivateApi_1 = require("./PrivateApi");
class ApexClient {
    constructor(env = Constant_1.PROD) {
        this.apiTool = new apexpro_1.ApiTool(env);
        this.publicApi = new PublicApi_1.PublicApi(this.apiTool);
        this.env = env;
    }
    async init(apiKeyCredentials, startPrivateKey, accountId) {
        const clientConfig = new Constant_1.ClientConfig();
        clientConfig.apiTool = this.apiTool;
        clientConfig.networkId = this.env.networkId;
        clientConfig.accountId = accountId;
        clientConfig.apiKeyCredentials = apiKeyCredentials;
        clientConfig.starkKeyPair = (0, starkex_lib_1.asSimpleKeyPair)((0, starkex_lib_1.asEcKeyPair)(startPrivateKey));
        clientConfig.clock = new apexpro_1.Clock();
        this.privateApi = new PrivateApi_1.PrivateApi(clientConfig);
        await this.initClock(clientConfig);
        await this.initConfig();
    }
    async initClock(clientConfig) {
        this.clientConfig = clientConfig;
        const { time } = await this.publicApi.time();
        this.clientConfig.clock.setTimestampAdjustment(time - new Date().getTime());
    }
    async initConfig() {
        this.user = await this.privateApi.user();
        this.account = await this.privateApi.getAccount(this.clientConfig.accountId, this.user.ethereumAddress);
        const symbols = {};
        const { perpetualContract: groupSymbols = [], currency, multiChain, global } = await this.publicApi.symbols();
        if (groupSymbols.length) {
            groupSymbols.forEach((obj, idx) => {
                const symbolInfo = {
                    ...obj,
                };
                symbolInfo.rankIdx = idx;
                symbolInfo.pricePrecision = (0, apexpro_1.getPrecision)(obj.tickSize);
                symbolInfo.priceStep = Number(obj.tickSize);
                symbolInfo.sizePrecision = (0, apexpro_1.getPrecision)(obj.stepSize);
                symbolInfo.sizeStep = Number(obj.stepSize);
                symbolInfo.baseCoin = obj.settleCurrencyId;
                symbolInfo.currentCoin = obj.underlyingCurrencyId;
                const baseCoinInfo = currency.find((item) => item.id === symbolInfo.baseCoin) || {};
                const currentCoinInfo = currency.find((item) => item.id === symbolInfo.currentCoin) || {};
                symbolInfo.baseCoinPrecision = Math.abs(Math.log10(Number(baseCoinInfo.showStep) || 1));
                symbolInfo.baseCoinRealPrecision = Math.abs(Math.log10(Number(baseCoinInfo.stepSize) || 1));
                symbolInfo.currentCoinPrecision = Math.abs(Math.log10(Number(currentCoinInfo.stepSize) || 1));
                symbolInfo.baseCoinIcon = baseCoinInfo.iconUrl;
                symbolInfo.currentCoinIcon = currentCoinInfo.iconUrl;
                symbols[obj.symbol] = symbolInfo;
            });
        }
        this.symbols = symbols;
        this.currency = currency;
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

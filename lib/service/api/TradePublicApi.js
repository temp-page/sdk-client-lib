"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradePublicApi = void 0;
class TradePublicApi {
    constructor(apiTool) {
        this.apiTool = apiTool;
    }
    async time() {
        return this.apiTool.apiRequest('/api/v1/time', 'get');
    }
    async symbols() {
        return this.apiTool.apiRequest('/api/v1/symbols', 'get');
    }
    async klines(kline) {
        return this.apiTool.apiRequest('/api/v1/klines', 'get', kline);
    }
    async depth(depthOptions) {
        return this.apiTool.apiRequest('/api/v1/depth', 'get', depthOptions);
    }
    async trades(tradesOptions) {
        return this.apiTool.apiRequest('/api/v1/trades', 'get', tradesOptions);
    }
    async historyFunding(historyFundingOptions) {
        return this.apiTool.apiRequest('/api/v1/history-funding', 'get', historyFundingOptions);
    }
    async tickers(tickersOptions) {
        return this.apiTool.apiRequest('/api/v1/tickers', 'get', tickersOptions);
    }
}
exports.TradePublicApi = TradePublicApi;

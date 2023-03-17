"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.setConfig = exports.getCurrency = exports.setCurrency = exports.getSymbols = exports.setSymbols = exports.WalletWay = exports.OrderSide = exports.ApexAsset = void 0;
var ApexAsset;
(function (ApexAsset) {
    ApexAsset["USDC"] = "USDC";
    ApexAsset["USDT"] = "USDT";
    ApexAsset["BTC"] = "BTC";
    ApexAsset["ETH"] = "ETH";
    ApexAsset["LINK"] = "LINK";
    ApexAsset["AAVE"] = "AAVE";
    ApexAsset["UNI"] = "UNI";
    ApexAsset["SUSHI"] = "SUSHI";
    ApexAsset["SOL"] = "SOL";
    ApexAsset["YFI"] = "YFI";
    ApexAsset["ONEINCH"] = "1INCH";
    ApexAsset["AVAX"] = "AVAX";
    ApexAsset["SNX"] = "SNX";
    ApexAsset["CRV"] = "CRV";
    ApexAsset["UMA"] = "UMA";
    ApexAsset["DOT"] = "DOT";
    ApexAsset["DOGE"] = "DOGE";
    ApexAsset["MATIC"] = "MATIC";
    ApexAsset["MKR"] = "MKR";
    ApexAsset["FIL"] = "FIL";
    ApexAsset["ADA"] = "ADA";
    ApexAsset["ATOM"] = "ATOM";
    ApexAsset["COMP"] = "COMP";
    ApexAsset["BCH"] = "BCH";
    ApexAsset["LTC"] = "LTC";
    ApexAsset["EOS"] = "EOS";
    ApexAsset["ALGO"] = "ALGO";
    ApexAsset["ZRX"] = "ZRX";
    ApexAsset["XMR"] = "XMR";
    ApexAsset["ZEC"] = "ZEC";
    ApexAsset["ENJ"] = "ENJ";
    ApexAsset["ETC"] = "ETC";
    ApexAsset["XLM"] = "XLM";
    ApexAsset["TRX"] = "TRX";
    ApexAsset["XTZ"] = "XTZ";
    ApexAsset["HNT"] = "HNT";
})(ApexAsset = exports.ApexAsset || (exports.ApexAsset = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide = exports.OrderSide || (exports.OrderSide = {}));
var WalletWay;
(function (WalletWay) {
    WalletWay["MetaMask"] = "injected";
    WalletWay["CoinbaseWallet"] = "coinbaseWallet";
    WalletWay["Walletconnect"] = "walletConnect";
})(WalletWay = exports.WalletWay || (exports.WalletWay = {}));
// 币对信息
let symbols = [];
const setSymbols = (data) => {
    symbols = data;
};
exports.setSymbols = setSymbols;
const getSymbols = () => {
    return symbols;
};
exports.getSymbols = getSymbols;
// 价值信息
let currency = [];
const setCurrency = (data) => {
    currency = data;
};
exports.setCurrency = setCurrency;
const getCurrency = () => {
    return currency;
};
exports.getCurrency = getCurrency;
// config
let config = {};
const setConfig = (data) => {
    config = data;
};
exports.setConfig = setConfig;
const getConfig = () => {
    return config;
};
exports.getConfig = getConfig;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRecordType = exports.OrderStatus = exports.TimeInForce = exports.OrderType = exports.OrderSide = exports.PositionStatus = exports.Asset = exports.Market = exports.TransferAsset = exports.ApexAsset = exports.ApexMarket = void 0;
var ApexMarket;
(function (ApexMarket) {
    ApexMarket["BTC_USDT"] = "BTC-USDT";
    ApexMarket["BTC_USDC"] = "BTC-USDC";
    ApexMarket["BTC_USD"] = "BTC-USD";
    ApexMarket["ETH_USD"] = "ETH-USD";
    ApexMarket["ETH_USDC"] = "ETH-USDC";
    ApexMarket["LINK_USD"] = "LINK-USD";
    ApexMarket["AAVE_USD"] = "AAVE-USD";
    ApexMarket["UNI_USD"] = "UNI-USD";
    ApexMarket["SUSHI_USD"] = "SUSHI-USD";
    ApexMarket["SOL_USD"] = "SOL-USD";
    ApexMarket["YFI_USD"] = "YFI-USD";
    ApexMarket["ONEINCH_USD"] = "1INCH-USD";
    ApexMarket["AVAX_USD"] = "AVAX-USD";
    ApexMarket["SNX_USD"] = "SNX-USD";
    ApexMarket["CRV_USD"] = "CRV-USD";
    ApexMarket["UMA_USD"] = "UMA-USD";
    ApexMarket["DOT_USD"] = "DOT-USD";
    ApexMarket["DOGE_USD"] = "DOGE-USD";
    ApexMarket["MATIC_USD"] = "MATIC-USD";
    ApexMarket["MKR_USD"] = "MKR-USD";
    ApexMarket["FIL_USD"] = "FIL-USD";
    ApexMarket["ADA_USD"] = "ADA-USD";
    ApexMarket["ATOM_USD"] = "ATOM-USD";
    ApexMarket["COMP_USD"] = "COMP-USD";
    ApexMarket["BCH_USD"] = "BCH-USD";
    ApexMarket["LTC_USD"] = "LTC-USD";
    ApexMarket["EOS_USD"] = "EOS-USD";
    ApexMarket["ALGO_USD"] = "ALGO-USD";
    ApexMarket["ZRX_USD"] = "ZRX-USD";
    ApexMarket["XMR_USD"] = "XMR-USD";
    ApexMarket["ZEC_USD"] = "ZEC-USD";
    ApexMarket["ENJ_USD"] = "ENJ-USD";
    ApexMarket["ETC_USD"] = "ETC-USD";
    ApexMarket["XLM_USD"] = "XLM-USD";
    ApexMarket["TRX_USD"] = "TRX-USD";
    ApexMarket["XTZ_USD"] = "XTZ-USD";
    ApexMarket["HNT_USD"] = "HNT-USD";
})(ApexMarket = exports.ApexMarket || (exports.ApexMarket = {}));
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
var TransferAsset;
(function (TransferAsset) {
    TransferAsset["USDC"] = "USDC";
    TransferAsset["USDT"] = "USDT";
})(TransferAsset = exports.TransferAsset || (exports.TransferAsset = {}));
exports.Market = ApexMarket;
exports.Asset = ApexAsset;
var PositionStatus;
(function (PositionStatus) {
    PositionStatus["OPEN"] = "OPEN";
    PositionStatus["CLOSED"] = "CLOSED";
    PositionStatus["LIQUIDATED"] = "LIQUIDATED";
})(PositionStatus = exports.PositionStatus || (exports.PositionStatus = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide = exports.OrderSide || (exports.OrderSide = {}));
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "LIMIT";
    OrderType["MARKET"] = "MARKET";
    OrderType["CONDITION"] = "CONDITION";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var TimeInForce;
(function (TimeInForce) {
    TimeInForce["GTT"] = "GTT";
    TimeInForce["FOK"] = "FOK";
    TimeInForce["IOC"] = "IOC";
})(TimeInForce = exports.TimeInForce || (exports.TimeInForce = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["OPEN"] = "OPEN";
    OrderStatus["FILLED"] = "FILLED";
    OrderStatus["CANCELED"] = "CANCELED";
    OrderStatus["UNTRIGGERED"] = "UNTRIGGERED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderRecordType;
(function (OrderRecordType) {
    OrderRecordType["OPEN"] = "openOrders";
    OrderRecordType["HISTORY"] = "historyOrders";
    OrderRecordType["FILLS"] = "fills";
    OrderRecordType["PNL"] = "historicalPNL";
})(OrderRecordType = exports.OrderRecordType || (exports.OrderRecordType = {}));
__exportStar(require("./public"), exports);
__exportStar(require("./private"), exports);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeApi = void 0;
const starkex_lib_1 = require("../../starkex-lib");
const crypto_js_1 = __importDefault(require("crypto-js"));
const qs_1 = __importDefault(require("qs"));
const tool_1 = require("../tool");
const BasicException_1 = require("../BasicException");
const lodash_1 = __importDefault(require("lodash"));
class TradeApi {
    constructor(clientConfig) {
        this.clientConfig = clientConfig;
    }
    async request(path, method, data = {}, config = {
        headers: {},
        form: true,
    }) {
        if (['get', 'delete'].indexOf(method.toLowerCase()) >= 0) {
            if (Object.keys(data).length > 0) {
                path = path + '?' + qs_1.default.stringify(data);
                data = {};
            }
        }
        const isoTimestamp = this.clientConfig.clock.getAdjustedIsoString();
        const headers = {
            'APEX-SIGNATURE': this.sign(path, method, isoTimestamp, data),
            'APEX-API-KEY': this.clientConfig.apiKeyCredentials.key,
            'APEX-TIMESTAMP': new Date(isoTimestamp).getTime(),
            'APEX-PASSPHRASE': this.clientConfig.apiKeyCredentials.passphrase,
        };
        config.headers = {
            ...config.headers,
            ...headers,
        };
        return this.clientConfig.apiTool.apiRequest(path, method, qs_1.default.stringify(data), config);
    }
    sign(requestPath, method, isoTimestamp, data) {
        const messageString = new Date(isoTimestamp).getTime() +
            method.toUpperCase() +
            requestPath +
            (lodash_1.default.isEmpty(data) ? '' : qs_1.default.stringify(data, { encode: false }));
        const key = Buffer.from(this.clientConfig.apiKeyCredentials.secret).toString('base64');
        const hash = crypto_js_1.default.HmacSHA256(messageString, key);
        const res = hash.toString(crypto_js_1.default.enc.Base64);
        return res;
    }
    async getSignature(signature, signatureFunc) {
        if (signature) {
            return signature;
        }
        if (!this.clientConfig.starkKeyPair) {
            throw new BasicException_1.BasicException('StarkKeyPair Uninitialized');
        }
        return await signatureFunc();
    }
    /**
     *@description place a new order
     *
     * @symbol of the order
     * @side of the order
     * @type of the order
     * @timeInForce of the order
     * @size of the order
     * @price of the order
     * @limitFee of the order
     * @expiration of the order
     * @triggerPrice of the order if the order is a triggerable order
     * @trailingPercent of the order if the order is a trailing stop order
     * @clientId
     * @param params
     * @param positionId associated with the order
     */
    async createOrder(createOrderOptions, positionId) {
        let params = {
            clientId: createOrderOptions.clientId,
            expiration: (Date.now() + 30 * 24 * 60 * 60 * 1000),
            limitFee: createOrderOptions.limitFee,
            price: createOrderOptions.price,
            reduceOnly: createOrderOptions.reduceOnly,
            side: createOrderOptions.side,
            signature: '',
            size: createOrderOptions.size,
            symbol: createOrderOptions.symbol,
            timeInForce: createOrderOptions.timeInForce,
            type: createOrderOptions.type,
        };
        const clientId = params.clientId || (0, tool_1.generateRandomClientId)();
        let signature = await this.getSignature(params.signature, () => {
            const orderToSign = {
                humanSize: `${Number(params.size)}`,
                humanPrice: params.price,
                limitFee: params.limitFee,
                symbol: params.symbol,
                side: params.side,
                expirationIsoTimestamp: params.expiration,
                clientId,
                positionId,
            };
            const starkOrder = starkex_lib_1.SignableOrder.fromOrder(orderToSign, this.clientConfig.networkId);
            let p = this.clientConfig.starkKeyPair;
            return starkOrder.sign(p);
        });
        let order = {
            ...params,
            clientId,
            signature,
        };
        order.expiration = `${(0, starkex_lib_1.addOrderExpirationBufferHours)((0, starkex_lib_1.isoTimestampToEpochHours)(params.expiration)) * 60 * 60 * 1000}`;
        return this.request('/api/v1/create-order', 'post', order);
    }
    /**
     * @description cancel a specific order for a user by the order's unique id
     *
     * @param orderId of the order being canceled
     */
    async cancelOrder(orderId) {
        return this.request('/api/v1/delete-order', 'post', {
            id: orderId,
        });
    }
    /**
     * cancel all order
     * @returns
     */
    async cancelAllOrder(params) {
        return this.request('/api/v1/delete-open-orders', 'post', params ? params : {});
    }
    /**
     * 获取订单交易详情
     * @param orderId
     */
    async getOrderFills(orderId) {
        return this.request('/api/v1/order-fills', 'get', {
            orderId,
        });
    }
    /**
     * @description get orders for a user by a set of query parameters, open-order, history-order, fills
     *
     * @param {
     * @symbol the orders are for
     * @status the orders have
     * @side of the book the orders are on
     * @type of order
     * @limit to the number of orders returned
     * @createdBeforeOrAt sets the time of the last fill that will be received
     * @returnLatestOrders returns the latest orders instead of the oldest and the order is
     * from most recent to least recent (up to limit)
     * }
     */
    async getOrders(orderType, params = {}) {
        let pathMap = {
            historicalPNL: `/api/v1/historical-pnl`,
            openOrders: `/api/v1/open-orders`,
            fills: `/api/v1/fills`,
            historyOrders: `/api/v1/history-orders`,
        };
        return this.request(pathMap[orderType], 'get', {
            ...params,
        });
    }
    async user() {
        return this.request('/api/v1/user', 'get');
    }
    /**
     * get accounts
     * @param id  accountId
     * @param ethereumAddress ethereumAddress
     * @returns promise
     */
    async getAccounts(id, ethereumAddress) {
        if (!id) {
            throw new BasicException_1.BasicException('params id is required!');
        }
        if (!ethereumAddress) {
            throw new BasicException_1.BasicException('params ethereumAddress is required!');
        }
        return this.request('/api/v1/account', 'get', {
            id,
            ethereumAddress,
        });
    }
}
exports.TradeApi = TradeApi;

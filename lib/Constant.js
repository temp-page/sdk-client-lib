"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QA = exports.PROD = exports.ENV = exports.ClientConfig = void 0;
class ClientConfig {
}
exports.ClientConfig = ClientConfig;
class ENV {
    constructor(url, networkId) {
        this.url = url;
        this.networkId = networkId;
    }
}
exports.ENV = ENV;
exports.PROD = new ENV('https://pro.apex.exchange', 1);
exports.QA = new ENV('https://qa.pro.apex.exchange', 5);

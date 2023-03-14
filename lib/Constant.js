"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QA = exports.PROD = exports.ENV = void 0;
class ENV {
    constructor(url) {
        this.url = url;
    }
}
exports.ENV = ENV;
exports.PROD = new ENV('https://pro.apex.exchange');
exports.QA = new ENV('https://qa.pro.apex.exchange');

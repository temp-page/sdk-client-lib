"use strict";
/**
 * Wrappers for crypto functions, allowing implementations to be swapped out.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = exports.getPedersenHash = exports.setGlobalStarkVerificationImplementation = exports.setGlobalStarkSigningImplementation = exports.setGlobalStarkHashImplementation = exports.setGlobalStarkVerificationImplementationNoSanityCheck = exports.setGlobalStarkSigningImplementationNoSanityCheck = exports.setGlobalStarkHashImplementationNoSanityCheck = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const helpers_1 = require("../../helpers");
const starkware_1 = require("../starkware");
const TEST_SIGNATURE = {
    r: 'edf3922fdf0c1b98a861a38874120a437e33c08841923317aeb8ec6bad1400',
    s: 'a658327ad247b8e816aadd7758d96450f8d43c691aadf768cadd8784f3b8ef',
};
const TEST_KEY_PAIR = (0, helpers_1.asEcKeyPair)('1');
// Global state for all STARK signables.
let globalHashFunction = starkware_1.pedersen;
let globalSigningFunction = starkware_1.sign;
let globalVerificationFunction = starkware_1.verify;
/**
 * Set the hash function implementation that will be used for all StarkSignable objects.
 */
function setGlobalStarkHashImplementationNoSanityCheck(fn) {
    globalHashFunction = fn;
}
exports.setGlobalStarkHashImplementationNoSanityCheck = setGlobalStarkHashImplementationNoSanityCheck;
/**
 * Set the signing implementation that will be used for all StarkSignable objects.
 */
function setGlobalStarkSigningImplementationNoSanityCheck(fn) {
    globalSigningFunction = fn;
}
exports.setGlobalStarkSigningImplementationNoSanityCheck = setGlobalStarkSigningImplementationNoSanityCheck;
/**
 * Set the signature verification implementation that will be used for all StarkSignable objects.
 */
function setGlobalStarkVerificationImplementationNoSanityCheck(fn) {
    globalVerificationFunction = fn;
}
exports.setGlobalStarkVerificationImplementationNoSanityCheck = setGlobalStarkVerificationImplementationNoSanityCheck;
/**
 * Set the hash function implementation that will be used for all StarkSignable objects.
 */
async function setGlobalStarkHashImplementation(fn) {
    const result = await fn(new bn_js_1.default(0), new bn_js_1.default(1));
    if (!result.eq(new bn_js_1.default('2001140082530619239661729809084578298299223810202097622761632384561112390979'))) {
        throw new Error('setGlobalStarkHashImplementation: Sanity check failed');
    }
    setGlobalStarkHashImplementationNoSanityCheck(fn);
}
exports.setGlobalStarkHashImplementation = setGlobalStarkHashImplementation;
/**
 * Set the signing implementation that will be used for all StarkSignable objects.
 */
async function setGlobalStarkSigningImplementation(fn) {
    const result = await fn(TEST_KEY_PAIR, new bn_js_1.default(1));
    if (!(result.r.eq(new bn_js_1.default(TEST_SIGNATURE.r, 16)) && result.s.eq(new bn_js_1.default(TEST_SIGNATURE.s, 16)))) {
        // If the result doesn't match the test signature, it may still be valid, so check with the
        // signature verification function.
        const isValid = globalVerificationFunction(TEST_KEY_PAIR, new bn_js_1.default(1), (0, helpers_1.asSimpleSignature)(result));
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!isValid) {
            throw new Error('setGlobalStarkSigningImplementation: Sanity check failed');
        }
    }
    setGlobalStarkSigningImplementationNoSanityCheck(fn);
}
exports.setGlobalStarkSigningImplementation = setGlobalStarkSigningImplementation;
/**
 * Set the signature verification implementation that will be used for all StarkSignable objects.
 */
async function setGlobalStarkVerificationImplementation(fn) {
    const isValid = await fn(TEST_KEY_PAIR, new bn_js_1.default(1), TEST_SIGNATURE);
    if (!isValid) {
        throw new Error('setGlobalStarkVerificationImplementation: Sanity check failed');
    }
    const isValid2 = await fn(TEST_KEY_PAIR, new bn_js_1.default(2), TEST_SIGNATURE);
    if (isValid2) {
        throw new Error('setGlobalStarkVerificationImplementation: Sanity check failed');
    }
    setGlobalStarkVerificationImplementationNoSanityCheck(fn);
}
exports.setGlobalStarkVerificationImplementation = setGlobalStarkVerificationImplementation;
/**
 * Calculate a pedersen hash.
 */
async function getPedersenHash(left, right) {
    return globalHashFunction(left, right);
}
exports.getPedersenHash = getPedersenHash;
/**
 * Sign a message.
 */
async function sign(key, message) {
    return globalSigningFunction(key, message);
}
exports.sign = sign;
/**
 * Verify a signature.
 */
async function verify(key, message, signature) {
    return globalVerificationFunction(key, message, signature);
}
exports.verify = verify;

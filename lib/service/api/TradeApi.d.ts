import { ClientConfig } from '../Types';
import { CreateOrderOptions, OrderRecordType, OrderResponseObject, OrderSide, OrderStatus, OrderType } from './interface';
export declare class TradeApi {
    private clientConfig;
    constructor(clientConfig: ClientConfig);
    private request;
    private sign;
    private getSignature;
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
    createOrder(createOrderOptions: CreateOrderOptions, positionId: string): Promise<{
        order: OrderResponseObject;
    }>;
    /**
     * @description cancel a specific order for a user by the order's unique id
     *
     * @param orderId of the order being canceled
     */
    cancelOrder(orderId: string): Promise<{
        cancelOrder: OrderResponseObject;
    }>;
    /**
     * cancel all order
     * @returns
     */
    cancelAllOrder(params?: {
        [key: string]: any;
    }): Promise<{
        cancelOrder: OrderResponseObject;
    }>;
    /**
     * 获取订单交易详情
     * @param orderId
     */
    getOrderFills(orderId: string): Promise<{
        cancelOrder: OrderResponseObject;
    }>;
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
    getOrders(orderType: OrderRecordType, params?: {
        symbol?: string;
        status?: OrderStatus;
        side?: OrderSide;
        orderType?: OrderType;
        limit?: number;
        beginTimeInclusive?: number;
        endTimeExclusive?: number;
        page?: number;
        id?: string;
        type?: string;
    }): Promise<{
        orders: OrderResponseObject[];
    }>;
    user(): Promise<any>;
    /**
     * get accounts
     * @param id  accountId
     * @param ethereumAddress ethereumAddress
     * @returns promise
     */
    getAccounts(id: string, ethereumAddress: string): Promise<any>;
}

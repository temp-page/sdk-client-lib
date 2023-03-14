import { GetDepthOptions, GetHistoryFundingOptions, GetKlineOptions, GetTickersOptions, GetTradesOptions } from './interface';
import { ApiTool } from './ApiTool';
export declare class TradePublicApi {
    private apiTool;
    constructor(apiTool: ApiTool);
    time(): Promise<{
        time: number;
    }>;
    symbols(): Promise<{
        perpetualContract: any[];
        currency: any;
        multiChain: any;
        global: any;
    }>;
    klines(kline: GetKlineOptions): Promise<any>;
    depth(depthOptions: GetDepthOptions): Promise<any>;
    trades(tradesOptions: GetTradesOptions): Promise<any>;
    historyFunding(historyFundingOptions: GetHistoryFundingOptions): Promise<any>;
    tickers(tickersOptions: GetTickersOptions): Promise<any>;
}

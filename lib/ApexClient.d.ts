import { ENV } from './Constant';
import { ApiKeyCredentials, ApiTool, ClientConfig, KeyPair, TradeApi, TradePublicApi } from './service';
export declare class ApexClient {
    apiTool: ApiTool;
    tradePublicApi: TradePublicApi;
    tradeApi: TradeApi;
    clientConfig: ClientConfig;
    constructor(env?: ENV);
    init(apiKeyCredentials: ApiKeyCredentials, startPrivateKey: string | KeyPair, accountId: string, networkId: number): Promise<void>;
    private initClock;
    private initConfig;
}

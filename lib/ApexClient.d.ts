import { ClientConfig, ENV } from './Constant';
import { AccountObject, ApiKeyCredentials, ApiTool, CurrencyObject, KeyPair, SymbolInfoObject, UserObject } from './apexpro';
import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';
export declare class ApexClient {
    apiTool: ApiTool;
    publicApi: PublicApi;
    privateApi: PrivateApi;
    clientConfig: ClientConfig;
    env: ENV;
    user: UserObject;
    account: AccountObject;
    symbols: {
        [key: string]: SymbolInfoObject;
    };
    currency: CurrencyObject[];
    constructor(env?: ENV);
    init(apiKeyCredentials: ApiKeyCredentials, startPrivateKey: string | KeyPair, accountId: string): Promise<void>;
    private initClock;
    private initConfig;
}

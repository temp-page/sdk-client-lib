import { ClientConfig, ENV } from './Constant';
import { ApiKeyCredentials, ApiTool, KeyPair } from './apexpro';
import { PublicApi } from './PublicApi';
import { PrivateApi } from './PrivateApi';
export declare class ApexClient {
    apiTool: ApiTool;
    publicApi: PublicApi;
    privateApi: PrivateApi;
    clientConfig: ClientConfig;
    env: ENV;
    constructor(env?: ENV);
    init(apiKeyCredentials: ApiKeyCredentials, startPrivateKey: string | KeyPair, accountId: string): Promise<void>;
    private initClock;
    private initConfig;
}

import { ApiKeyCredentials, ApiTool, KeyPair } from './api';
import { Clock } from './tool';
export declare class ClientConfig {
    apiKeyCredentials: ApiKeyCredentials;
    starkKeyPair: KeyPair;
    clock: Clock;
    apiTool: ApiTool;
    networkId: number;
    accountId: string;
}

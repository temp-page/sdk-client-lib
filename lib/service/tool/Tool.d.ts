/**
 * 轮询休眠时长 ms
 */
export declare const SLEEP_MS: number;
/**
 * 休眠指定时间
 * @param ms
 */
export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * 判断算法未空字符串
 * @param value
 */
export declare const isNullOrBlank: (value: string) => boolean;
/**
 * 重试
 * @param func
 * @param retryCount
 */
export declare const retry: (func: () => any, retryCount?: number, sleep_ms?: number) => Promise<any>;
export declare function getDefaultValue(obj: any, path: string, defaultValue: any): any;
export declare function generateRandomClientId(): string;
export declare function getPrecision(num: number | string): number;
/**
 * 日志工具
 */
export declare class TraceTool {
    private logShow;
    private errorShow;
    private debugShow;
    setLogShow(b: boolean): void;
    setErrorShow(b: boolean): void;
    setDebugShow(b: boolean): void;
    log(...args: any[]): void;
    print(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
}
export declare const Trace: TraceTool;

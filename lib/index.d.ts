export declare function genTraversalHandler(fn: (...args: any[]) => any, setter?: (...args: any[]) => any): (...args: any[]) => any;
export declare function deepClone<T>(source: T): T;
export declare function deepAssign<T>(...args: T[]): T & T;
export declare function camelize(str: string, isBig?: boolean): string;
export declare function hypenate(str: string): string;
export declare function bind(fn: (...args: any[]) => any, context: any): (...args: any[]) => any;
export declare function uuid(): string;
export declare function S4(): string;
export declare function rand(length: number): string;
export declare function getDeepProperty(obj: any, keys: string | string[], { throwError, backup, }?: {
    throwError?: boolean;
    backup?: any;
}): any;

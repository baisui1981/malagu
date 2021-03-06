import { ErrorConverter, JsonRpcProxy } from '../../common';

export const ProxyProvider = Symbol('ProxyProvider');

export interface ProxyProvider {
    provide<T extends object>(path: string, errorConverters?: ErrorConverter[], target?: object): JsonRpcProxy<T>;
}

export const ProxyCreator = Symbol('ProxyCreator');

export interface ProxyCreator {
    create<T extends object>(path: string, errorConverters?: ErrorConverter[], target?: object): JsonRpcProxy<T>;
    support(path: string): number
}

export interface ConnectionOptions {
    reconnecting?: boolean;
}

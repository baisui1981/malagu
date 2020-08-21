import { Middleware } from '../middleware';
import { Context } from '../context';
import { Component, Value } from '@malagu/core';
import * as cors from 'cors';
import { CORS, ENDPOINT, HttpHeaders } from '../../common';
import { CORS_MIDDLEWARE_PRIORITY } from './cors-protocol';

@Component([CorsMiddleware, Middleware])
export class CorsMiddleware implements Middleware {

    @Value(CORS)
    protected readonly options: any;

    @Value(ENDPOINT)
    protected readonly endpoint?: string;

    async handle(ctx: Context, next: () => Promise<void>): Promise<void> {
        return new Promise((resolve, reject) => cors(this.options)(ctx.request as any, ctx.response as any, (err: any) => {
            if (err) {
                reject(err);
            } else {
                if (this.endpoint && !ctx.response.getHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN)) {
                    ctx.response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, this.endpoint);
                }
                next().then(resolve).catch(reject);
            }
        }));
    }

    readonly priority = CORS_MIDDLEWARE_PRIORITY;

}

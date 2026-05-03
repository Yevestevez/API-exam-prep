import { env } from './config/env.ts';
import express from 'express';
import debug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
//import type { PrismaClient } from './generated/prisma/client.ts';

export const createApp = () => {
    const log = debug(`${env.PROJECT_NAME}:app`);
    log('Starting Express app');

    const app = express();

    app.disable('x-powered-by');
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: '*',
        }),
    );
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static('public'));

    app.use('/health', (_req, res) => {
        return res.json({
            status: 'ok',
            timeStamp: new Date().toISOString(),
        });
    });

    app.use((_req, _res, next) => {
        log('Calling error handler for non exist routes');
        const error = new Error();
        next(error);
    });

    //app.use(errorHandler)

    return app;
};

import { env } from './config/env.ts';
import express from 'express';
import debug from 'debug';
import cors from 'cors';
import morgan from 'morgan';
import { HttpError } from './errors/http-errors.ts';
import type { PrismaClient } from './generated/prisma/client.ts';

import { errorHandler } from './middleware/error-handler.ts';
import { WizardsRouter } from './routers/wizards.routes.ts';
import { WizardsController } from './controllers/wizard.controller.ts';
import { WizardsRepo } from './repositories/wizards.repo.ts';

export const createApp = (prisma: PrismaClient) => {
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

    app.get('/', async (_req, res) => {
        log('Received request to root endpoint');
        return res.send('Home');
    });

    app.get('/api', async (_req, res) => {
        log('Received request to API root endpoint');
        return res.send('API');
    });

    const wizardsRepo = new WizardsRepo(prisma);
    const wizardsController = new WizardsController(wizardsRepo);
    const wizardsRouter = new WizardsRouter(wizardsController);
    app.use('/api/wizards', wizardsRouter.router);

    app.use((_req, _res, next) => {
        log('Calling error handler for non exist routes');
        const error = new HttpError(404, 'Not Found', 'Resource nor found');
        next(error);
    });

    app.use(errorHandler);

    return app;
};

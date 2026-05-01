import { env } from './config/env.ts';
import express from 'express';
import debug from 'debug';
// TODO: Recibe un ciente prisma y devuelve una app express con las rutas iniciales del proyecto
export const createApp = () => {
    const log = debug(`${env.PROJECT_NAME}:app`);
    log('Starting Express app');
    const app = express();
    return app;
};

import { env } from './config/env.ts';
import debug from 'debug';
import { createServer } from 'node:http';
import { createApp } from './app.ts';
import { connectDB } from './config/db-config.ts';

const log = debug(`${env.PROJECT_NAME}:server`);

const listenManager = () => {
    const addr = server.address();
    if (addr === null) return;
    let bind;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    } else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `${addr.address}:${addr?.port}`;
    }
    if (env.NODE_ENV !== 'dev') {
        console.log(`Server listening on ${bind}`);
    } else {
        log(`Server listening from ${bind}`);
    }
};
const startServer = async () => {
    log('Starting Node server');

    const prisma = await connectDB();
    const app = createApp(prisma);
    const port = env.PORT || 3000;
    const server = createServer(app);
    log('Node server created');
    server.listen(port);
    server.on('listening', listenManager);
    return server;
};

const server = await startServer().catch((error) => {
    log('Error starting server', error);
    process.exit(1);
});

import debug from 'debug';
import { env } from '../config/env.ts';
import { PrismaClient, type Wizard } from '../generated/prisma/client.ts';

const log = debug(`${env.PROJECT_NAME}:repo:wizards`);
log('Loading wizards repository...');

export class WizardsRepo {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    getAllWizards = async (): Promise<Omit<Wizard, 'password'>[]> => {
        log('Getting all Wizards...');

        return this.#prisma.wizard.findMany({
            omit: {
                password: true,
            },
        });
    };
}

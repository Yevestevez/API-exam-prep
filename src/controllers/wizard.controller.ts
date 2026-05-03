import debug from 'debug';
import type { NextFunction, Request, Response } from 'express';

import { env } from '../config/env.ts';
import { HttpError } from '../errors/http-errors.ts';
import type { WizardsRepo } from '../repositories/wizards.repo.ts';
import type { Wizard } from '../generated/prisma/client.ts';

const log = debug(`${env.PROJECT_NAME}:controller:wizards`);
log('Starting wizards controller...');

export class WizardsController {
    #repo: WizardsRepo;

    constructor(repo: WizardsRepo) {
        this.#repo = repo;
    }

    getAllWizards = async (
        _req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        log('Getting all wizards...');

        try {
            const wizards: Omit<Wizard, 'password'>[] =
                await this.#repo.getAllWizards();
            return res.json(wizards);
        } catch (error) {
            const finalError = new HttpError(
                500,
                'Internal Server Error',
                'An error occurred while fetching wizards',
                {
                    cause: error,
                },
            );

            return next(finalError);
        }
    };
}

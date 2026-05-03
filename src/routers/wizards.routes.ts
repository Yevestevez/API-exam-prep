import { Router } from 'express';
import debug from 'debug';

import { env } from '../config/env.ts';
import type { WizardsController } from '../controllers/wizard.controller.ts';

const log = debug(`${env.PROJECT_NAME}:router:wizards`);
log('Loading Wizards router...');

export class WizardsRouter {
    #router: Router;
    #controller: WizardsController;

    constructor(controller: WizardsController) {
        this.#router = Router();
        this.#controller = controller;

        this.#router.get('/', this.#controller.getAllWizards);
    }

    get router() {
        return this.#router;
    }
}

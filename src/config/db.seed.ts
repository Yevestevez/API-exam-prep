import { env } from './env.ts';
import debug from 'debug';
import { connectDB } from './db-config.ts';
import WIZARDS from '../../data/wizards.json' with { type: 'json' };
import { fileURLToPath } from 'node:url';
import type { WizardCreateInput } from '../generated/prisma/models.ts';

const log = debug(`${env.PROJECT_NAME}:configDB`);

type WizardSeedInput = Pick<
    WizardCreateInput,
    'name' | 'surname' | 'password' | 'age' | 'wand' | 'patronus'
> & {
    house: string;
};

log('Loaded database connection...');

export const wizardSeed = async (wizards: readonly WizardSeedInput[]) => {
    const prisma = await connectDB();
    log('Seeding to database...');

    await prisma.wizard.deleteMany();

    for (const wizard of wizards) {
        // const hashedPassword = await AuthService.hash(wizard.password);

        await prisma.wizard.create({
            data: {
                name: wizard.name,
                surname: wizard.surname,
                password: wizard.password,
                age: wizard.age,
                house: wizard.house as WizardCreateInput['house'],
                wand: wizard.wand,
                patronus: wizard.patronus,
            },
        });
    }
};

export const seed = async () => {
    await wizardSeed(WIZARDS);
};

// Run seed if this file is executed directly
const currentFilePath = fileURLToPath(import.meta.url);
const processFilePath = process.argv[1];

if (currentFilePath === processFilePath) {
    console.log('Starting seed');
    seed()
        .then(() => {
            console.log('Seed completed successfully.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error seeding the database:', error);
            process.exit(1);
        });
}

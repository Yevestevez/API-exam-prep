-- CreateEnum
CREATE TYPE "House" AS ENUM ('Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff');

-- CreateTable
CREATE TABLE "Wizard" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "house" "House" NOT NULL,
    "wand" VARCHAR(100) NOT NULL,
    "patronus" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wizard_pkey" PRIMARY KEY ("id")
);

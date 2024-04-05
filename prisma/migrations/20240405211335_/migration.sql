/*
  Warnings:

  - Added the required column `isVisible` to the `Cripto_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Cripto_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cripto_data" ADD COLUMN     "isVisible" BOOLEAN NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

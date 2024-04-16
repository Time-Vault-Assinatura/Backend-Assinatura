/*
  Warnings:

  - You are about to drop the column `cripto_data_type` on the `Cripto_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cripto_data" DROP COLUMN "cripto_data_type";

-- DropEnum
DROP TYPE "Cripto_data_types";

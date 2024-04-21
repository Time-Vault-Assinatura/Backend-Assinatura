/*
  Warnings:

  - The `data_entrada` column on the `Cripto_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cripto_data" DROP COLUMN "data_entrada",
ADD COLUMN     "data_entrada" TIMESTAMP(3);

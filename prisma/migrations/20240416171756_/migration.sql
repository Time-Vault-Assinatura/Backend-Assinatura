-- CreateEnum
CREATE TYPE "Cripto_data_types" AS ENUM ('CONS', 'VAULT', 'ARROJ', 'OUT');

-- DropIndex
DROP INDEX "Cripto_data_idCMC_key";

-- AlterTable
ALTER TABLE "Cripto_data" ADD COLUMN     "cripto_data_type" "Cripto_data_types" NOT NULL DEFAULT 'OUT';

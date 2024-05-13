/*
  Warnings:

  - Added the required column `assunto` to the `Feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria` to the `Feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cripto_data" ADD COLUMN     "imagem" TEXT;

-- AlterTable
ALTER TABLE "Feedbacks" ADD COLUMN     "assunto" TEXT NOT NULL,
ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "nps" TEXT,
ALTER COLUMN "feedback" DROP NOT NULL;

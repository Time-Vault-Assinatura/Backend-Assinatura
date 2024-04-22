-- DropIndex
DROP INDEX "Cripto_data_idCMC_key";

-- AlterTable
ALTER TABLE "Cripto_data" ADD COLUMN     "data_entrada" TIMESTAMP(3),
ADD COLUMN     "wallet" TEXT,
ALTER COLUMN "idCMC" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

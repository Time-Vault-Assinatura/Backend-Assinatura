-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Cripto_data" (
    "id" TEXT NOT NULL,
    "idCMC" INTEGER NOT NULL,
    "ticker" TEXT,
    "entrada" TEXT,
    "precoAtual" TEXT,
    "alocacao" TEXT,
    "alocacaoAtual" TEXT,
    "rentabilidade" TEXT,
    "vies" TEXT,
    "quantidade" TEXT,
    "valorInvestido" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "lastAutoUpdate" TEXT,

    CONSTRAINT "Cripto_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historic_buy_sell" (
    "id" TEXT NOT NULL,
    "criptoId" TEXT NOT NULL,
    "qnt" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Historic_buy_sell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "isFirstAcess" BOOLEAN NOT NULL DEFAULT true,
    "role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cripto_data_idCMC_key" ON "Cripto_data"("idCMC");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Historic_buy_sell" ADD CONSTRAINT "Historic_buy_sell_criptoId_fkey" FOREIGN KEY ("criptoId") REFERENCES "Cripto_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
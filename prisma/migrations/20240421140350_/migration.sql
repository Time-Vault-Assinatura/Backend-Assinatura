-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Wallets" AS ENUM ('CONSERVADORA', 'MODERADA', 'ARROJADA', 'OUT');

-- CreateTable
CREATE TABLE "Cripto_data" (
    "id" TEXT NOT NULL,
    "idCMC" INTEGER,
    "ticker" TEXT,
    "entrada" TEXT,
    "data_entrada" TEXT,
    "precoAtual" TEXT,
    "alocacao" TEXT,
    "alocacaoAtual" TEXT,
    "rentabilidade" TEXT,
    "vies" TEXT,
    "quantidade" TEXT,
    "valorInvestido" TEXT,
    "wallet" "Wallets" NOT NULL DEFAULT 'OUT',
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

-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Historic_buy_sell" ADD CONSTRAINT "Historic_buy_sell_criptoId_fkey" FOREIGN KEY ("criptoId") REFERENCES "Cripto_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

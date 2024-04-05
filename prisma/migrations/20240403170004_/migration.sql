-- CreateTable
CREATE TABLE "CriptoData" (
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

    CONSTRAINT "CriptoData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CriptoData_idCMC_key" ON "CriptoData"("idCMC");

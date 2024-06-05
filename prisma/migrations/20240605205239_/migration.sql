-- CreateTable
CREATE TABLE "global_market_infos" (
    "id" SERIAL NOT NULL,
    "informationName" TEXT NOT NULL,
    "informationValue" TEXT NOT NULL,
    "information24hChange" TEXT NOT NULL,

    CONSTRAINT "global_market_infos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "global_market_infos_informationName_key" ON "global_market_infos"("informationName");

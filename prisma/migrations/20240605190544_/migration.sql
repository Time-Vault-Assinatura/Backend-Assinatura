-- CreateTable
CREATE TABLE "Update" (
    "id" SERIAL NOT NULL,
    "update" TEXT NOT NULL,
    "updateDate" TEXT NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profit_graph" (
    "id" TEXT NOT NULL,
    "profit" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,

    CONSTRAINT "Profit_graph_pkey" PRIMARY KEY ("id")
);

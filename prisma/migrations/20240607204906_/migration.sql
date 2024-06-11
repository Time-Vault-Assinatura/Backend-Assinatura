/*
  Warnings:

  - The primary key for the `Profit_graph` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Profit_graph` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profit_graph" DROP CONSTRAINT "Profit_graph_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profit_graph_pkey" PRIMARY KEY ("id");

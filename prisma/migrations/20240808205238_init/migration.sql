/*
  Warnings:

  - Added the required column `data` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vendas` ADD COLUMN `data` DATETIME(3) NOT NULL;

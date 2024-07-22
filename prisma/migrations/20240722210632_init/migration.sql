/*
  Warnings:

  - You are about to drop the column `produto_id` on the `Estoques` table. All the data in the column will be lost.
  - You are about to drop the column `estoque_id` on the `Produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Estoques` DROP FOREIGN KEY `Estoques_produto_id_fkey`;

-- DropForeignKey
ALTER TABLE `Produtos` DROP FOREIGN KEY `Produtos_estoque_id_fkey`;

-- AlterTable
ALTER TABLE `Estoques` DROP COLUMN `produto_id`;

-- AlterTable
ALTER TABLE `Produtos` DROP COLUMN `estoque_id`;

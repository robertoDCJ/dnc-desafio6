/*
  Warnings:

  - You are about to drop the column `pedido_id` on the `Vendas` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `PedidosOnEstoques` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Vendas` DROP FOREIGN KEY `Vendas_pedido_id_fkey`;

-- AlterTable
ALTER TABLE `PedidosOnEstoques` ADD COLUMN `quantidade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Vendas` DROP COLUMN `pedido_id`;

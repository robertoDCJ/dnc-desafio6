/*
  Warnings:

  - You are about to drop the column `produtos_id` on the `Pedidos` table. All the data in the column will be lost.
  - Added the required column `produts_id` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Pedidos` DROP FOREIGN KEY `Pedidos_produtos_id_fkey`;

-- AlterTable
ALTER TABLE `Pedidos` DROP COLUMN `produtos_id`,
    ADD COLUMN `produts_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_produts_id_fkey` FOREIGN KEY (`produts_id`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

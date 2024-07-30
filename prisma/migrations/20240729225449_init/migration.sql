/*
  Warnings:

  - You are about to drop the column `produts_id` on the `Pedidos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pedidos` DROP FOREIGN KEY `Pedidos_produts_id_fkey`;

-- AlterTable
ALTER TABLE `Pedidos` DROP COLUMN `produts_id`;

-- CreateTable
CREATE TABLE `_EstoquesToPedidos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EstoquesToPedidos_AB_unique`(`A`, `B`),
    INDEX `_EstoquesToPedidos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EstoquesToPedidos` ADD CONSTRAINT `_EstoquesToPedidos_A_fkey` FOREIGN KEY (`A`) REFERENCES `Estoques`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EstoquesToPedidos` ADD CONSTRAINT `_EstoquesToPedidos_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

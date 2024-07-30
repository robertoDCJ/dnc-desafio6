/*
  Warnings:

  - You are about to drop the `_EstoquesToPedidos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `estoques_id` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_EstoquesToPedidos` DROP FOREIGN KEY `_EstoquesToPedidos_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EstoquesToPedidos` DROP FOREIGN KEY `_EstoquesToPedidos_B_fkey`;

-- AlterTable
ALTER TABLE `Pedidos` ADD COLUMN `estoques_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_EstoquesToPedidos`;

-- CreateTable
CREATE TABLE `PedidosOnEstoques` (
    `estoque_id` INTEGER NOT NULL,
    `pedido_id` INTEGER NOT NULL,

    PRIMARY KEY (`estoque_id`, `pedido_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PedidosOnEstoques` ADD CONSTRAINT `PedidosOnEstoques_estoque_id_fkey` FOREIGN KEY (`estoque_id`) REFERENCES `Estoques`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidosOnEstoques` ADD CONSTRAINT `PedidosOnEstoques_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

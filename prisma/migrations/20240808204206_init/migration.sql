/*
  Warnings:

  - A unique constraint covering the columns `[pedido_id]` on the table `Vendas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pedido_id` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_total` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vendas` ADD COLUMN `pedido_id` INTEGER NOT NULL,
    ADD COLUMN `valor_total` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Vendas_pedido_id_key` ON `Vendas`(`pedido_id`);

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

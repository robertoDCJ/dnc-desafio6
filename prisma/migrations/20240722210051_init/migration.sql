/*
  Warnings:

  - The primary key for the `Estoques` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Estoques` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[estoque_id]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Estoques` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoque_id` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Estoques` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `quantidade` INTEGER NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Produtos` ADD COLUMN `estoque_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Estoques_id_key` ON `Estoques`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Produtos_estoque_id_key` ON `Produtos`(`estoque_id`);

-- AddForeignKey
ALTER TABLE `Produtos` ADD CONSTRAINT `Produtos_estoque_id_fkey` FOREIGN KEY (`estoque_id`) REFERENCES `Estoques`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

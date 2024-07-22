/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Pedidos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Vendas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Estoques` MODIFY `quantidade` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Produtos` MODIFY `preco` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Clientes_id_key` ON `Clientes`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Clientes_nome_key` ON `Clientes`(`nome`);

-- CreateIndex
CREATE UNIQUE INDEX `Pedidos_id_key` ON `Pedidos`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Produtos_id_key` ON `Produtos`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Produtos_nome_key` ON `Produtos`(`nome`);

-- CreateIndex
CREATE UNIQUE INDEX `Vendas_id_key` ON `Vendas`(`id`);

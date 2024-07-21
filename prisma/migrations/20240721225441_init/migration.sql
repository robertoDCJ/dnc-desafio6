-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estoques` (
    `produto_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    UNIQUE INDEX `Estoques_produto_id_key`(`produto_id`),
    PRIMARY KEY (`produto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtos_id` INTEGER NOT NULL,
    `cliente_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,

    UNIQUE INDEX `Vendas_pedido_id_key`(`pedido_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estoques` ADD CONSTRAINT `Estoques_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_produtos_id_fkey` FOREIGN KEY (`produtos_id`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendas` ADD CONSTRAINT `Vendas_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Usuario_Funcion` DROP FOREIGN KEY `Usuario_Funcion_id_usuario_fkey`;

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    MODIFY `id_usuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_usuario`);

-- AlterTable
ALTER TABLE `Usuario_Funcion` MODIFY `id_usuario` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario_Funcion` ADD CONSTRAINT `Usuario_Funcion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

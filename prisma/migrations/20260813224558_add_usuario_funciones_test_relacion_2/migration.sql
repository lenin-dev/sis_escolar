/*
  Warnings:

  - You are about to drop the `funciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario_funcion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `funciones`;

-- DropTable
DROP TABLE `usuario`;

-- DropTable
DROP TABLE `usuario_funcion`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` VARCHAR(10) NOT NULL,
    `nombre_completo` VARCHAR(50) NOT NULL,
    `usuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(100) NOT NULL,
    `correo` VARCHAR(50) NOT NULL,
    `activo` TINYINT NOT NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funciones` (
    `id_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_funcion` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(100) NOT NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario_Funcion` (
    `id_usu_fun` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` VARCHAR(10) NOT NULL,
    `id_funcion` INTEGER NOT NULL,
    `fecha_asignacion` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id_usu_fun`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario_Funcion` ADD CONSTRAINT `Usuario_Funcion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

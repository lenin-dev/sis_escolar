-- CreateTable
CREATE TABLE `usuario` (
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
CREATE TABLE `funciones` (
    `id_funcion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_funcion` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(100) NOT NULL,
    `fecha_creacion` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_funcion` (
    `id_usuario` VARCHAR(10) NOT NULL,
    `id_funcion` INTEGER NOT NULL,
    `fecha_asignacion` TIMESTAMP(0) NOT NULL,
    `id_usu_fun` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id_usu_fun`, `id_usuario`, `id_funcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario_Funcion` ADD CONSTRAINT `Usuario_Funcion_id_funcion_fkey` FOREIGN KEY (`id_funcion`) REFERENCES `Funciones`(`id_funcion`) ON DELETE RESTRICT ON UPDATE CASCADE;

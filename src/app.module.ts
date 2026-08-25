import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { FuncionesModule } from './funciones/funciones.module.js';

@Module({
  imports: [UsuariosModule, PrismaModule, FuncionesModule],
  providers: [],
})
export class AppModule {}
